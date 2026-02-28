// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.ProductTwos;
using AggroCom.Services.Foundations.ProductTwos;
using AggroCom.Services.Processings.ProductTwos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using AggroCom.Services.Orchestrations.ProductTwoTableTwoOrchestrations;

namespace AggroCom.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductTwoController : RESTFulController
    {
        private readonly IProductTwoService ProductTwoService;
        private readonly string uploadsFolder = "/var/www/files";
        private readonly string baseUrl = "https://aag-group.uz:8080";
        private readonly IProductTwoProcessingService ProductTwoProcessingService;
        private readonly IProductTwoTableTwoOrchestrationService
            productTwoTableTwoOrchestrationService;

        public ProductTwoController(
            IProductTwoService productTwoService, 
            IProductTwoProcessingService productTwoProcessingService,
            IProductTwoTableTwoOrchestrationService 
            productTwoTableTwoOrchestrationService)
        {
            ProductTwoService = productTwoService;
            ProductTwoProcessingService = productTwoProcessingService;
            this.productTwoTableTwoOrchestrationService = 
                productTwoTableTwoOrchestrationService;
        }

        [HttpPost]
        public async ValueTask<ActionResult<ProductTwo>> PostProductTwoAsync(
        [FromForm] ProductTwo productTwo,
        IFormFile picture,
        IFormFile icon)
        {
            try
            {
                if (productTwo == null)
                {
                    return BadRequest("Product data is missing.");
                }

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                if (picture != null && picture.Length > 0)
                {
                    string fileName = $"{Guid.NewGuid()}{Path.GetExtension(picture.FileName)}";
                    string filePath = Path.Combine(uploadsFolder, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await picture.CopyToAsync(fileStream);
                    }

                    productTwo.ProductPicture = $"{baseUrl}/files/{fileName}";
                }
                else
                {
                    return BadRequest("Product picture is required.");
                }

                if (icon != null && icon.Length > 0)
                {
                    string iconFileName = $"{Guid.NewGuid()}{Path.GetExtension(icon.FileName)}";
                    string iconFilePath = Path.Combine(uploadsFolder, iconFileName);

                    using (var iconStream = new FileStream(iconFilePath, FileMode.Create))
                    {
                        await icon.CopyToAsync(iconStream);
                    }

                    productTwo.ProductIcon = $"{baseUrl}/files/{iconFileName}";
                }
                else
                {
                    return BadRequest("Icon is required.");
                }

                ProductTwo newProductTwo = new ProductTwo
                {
                    Id = productTwo.Id,
                    TitleUz = productTwo.TitleUz,
                    TitleRu = productTwo.TitleRu,
                    NameUz = productTwo.NameUz,
                    NameRu = productTwo.NameRu,
                    DesUz = productTwo.DesUz,
                    DesRu = productTwo.DesRu,
                    DescriptionUz = productTwo.DescriptionUz,
                    DescriptionRu = productTwo.DescriptionRu,
                    SarfUz = productTwo.SarfUz,
                    SarfRu = productTwo.SarfRu,
                    ProductPicture = productTwo.ProductPicture,
                    ProductIcon = productTwo.ProductIcon,
                    ProductTwoName = productTwo.ProductTwoName,
                    ProductTwoType = productTwo.ProductTwoType,
                    TableTwos = productTwo.TableTwos
                };

                ProductTwo addedProductTwo = await this.ProductTwoService.AddProductTwoAsync(newProductTwo);

                return Created(addedProductTwo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IQueryable<ProductTwo>>> GetAllProductTwos()
        {
            try
            {
                var products = await ProductTwoService.RetrieveAllProductTwosAsync();

                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductTwo>> GetProductTwoById(int id)
        {
            try
            {
                var product = await ProductTwoService.RetrieveProductTwoByIdAsync(id);
                if (product == null)
                {
                    return NotFound($"Product with ID {id} not found.");
                }

                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{ProductTwoId}")]
        public async ValueTask<ActionResult<ProductTwo>> DeleteProductTwoByIdAsync(int ProductTwoId)
        {
            try
            {
                return await this.ProductTwoService.
                    RemoveProductTwoAsync(ProductTwoId);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("details/{productId}")]
        public async Task<IActionResult> GetProductTwoTableOneByIdAsync(int productId)
        {
            try
            {
                var product = await this.productTwoTableTwoOrchestrationService
                    .RetrieveProductTwoTableTwoByIdAsync(productId);

                if (product == null)
                {
                    return NotFound($"Product with ID {productId} not found.");
                }

                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Biostimulyator")]
        public async Task<IActionResult> GetBiosAsync()
        {
            try
            {
                var bios = await this.ProductTwoProcessingService
                    .RetrieveAllProductTwosBiostimulyatorAsync();

                return Ok(bios);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Mikroelement")]
        public async Task<IActionResult> GetMicroelementAsync()
        {
            try
            {
                var microe = await this.ProductTwoProcessingService
                    .RetrieveAllProductTwosMikroelementAsync();

                return Ok(microe);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Npk")]
        public async Task<IActionResult> GetNpkAsync()
        {
            try
            {
                var npk = await this.ProductTwoProcessingService
                    .RetrieveAllProductTwosNpkAsync();  
                   
                return Ok(npk);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Oganik")]
        public async Task<IActionResult> GetOrganikAsync()
        {
            try
            {
                var organik = await this.ProductTwoProcessingService
                    .RetrieveAllProductTwosOrganikAsync();

                return Ok(organik);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
