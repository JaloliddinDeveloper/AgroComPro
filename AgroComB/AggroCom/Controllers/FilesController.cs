// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Brokers.Storages;
using AggroCom.Models.Foundations.Katalogs;
using AggroCom.Services.Foundations.Katalogs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilesController : RESTFulController
    {
        private readonly IStorageBroker storageBroker;
        private readonly IKatalogService katalogService;
        private readonly string uploadsFolder = "/var/www/files";
        private readonly string baseUrl = "https://aag-group.uz:8080";

        public FilesController(
            IStorageBroker storageBroker,
            IKatalogService katalogService)
        {
            this.storageBroker = storageBroker;
            this.katalogService = katalogService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(
                     IFormFile picture, IFormFile file,
                     string nameUz, string nameRu, int Type)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Main file not found or empty.");

            if (picture == null || picture.Length == 0)
                return BadRequest("Picture file not found or empty.");

            var fileExtension = Path.GetExtension(file.FileName).ToLower();
            var pictureExtension = Path.GetExtension(picture.FileName).ToLower();

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".pdf", ".docx", ".xlsx" };

            if (!allowedExtensions.Contains(fileExtension))
                return BadRequest($"File type '{fileExtension}' is not allowed.");

            if (!allowedExtensions.Contains(pictureExtension))
                return BadRequest($"Picture type '{pictureExtension}' is not allowed.");

            try
            {
                string uploadPath = uploadsFolder;

                if (!Directory.Exists(uploadPath))
                    Directory.CreateDirectory(uploadPath);

                string fileGuid = Guid.NewGuid().ToString();
                string pictureGuid = Guid.NewGuid().ToString();

                string mainFilePath = Path.Combine(uploadPath, fileGuid + fileExtension);
                string pictureFilePath = Path.Combine(uploadPath, pictureGuid + pictureExtension);

                using (var stream = new FileStream(mainFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                using (var stream = new FileStream(pictureFilePath, FileMode.Create))
                {
                    await picture.CopyToAsync(stream);
                }

                var fileRecord = new Katalog
                {
                    FileName = fileGuid + fileExtension,
                    FilePath = $"{baseUrl}/files/{fileGuid + fileExtension}",
                    FilePicture = $"{baseUrl}/files/{pictureGuid + pictureExtension}",
                    FileSize = file.Length,
                    NameUz = nameUz,
                    NameRu = nameRu,
                    Type = Type
                };

                await this.storageBroker.InsertKatalogAsync(fileRecord);

                return Created(fileRecord.FilePath, fileRecord);
            }
            catch (Exception ex)
            {
                var innerMessage = ex.InnerException?.Message ?? ex.Message;
                return StatusCode(500, $"Internal server error: {innerMessage}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetFiles()
        {
            var files = await this.storageBroker.SelectAllKatalogsAsync();
            return Ok(files);
        }

        [HttpDelete("{Id}")]
        public async ValueTask<ActionResult<Katalog>> DeleteKatalogByIdAsync(int Id)
        {
            try
            {
                return await this.katalogService.RemoveKatalogAsync(Id);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
