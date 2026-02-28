// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.ProductOnes;
using AggroCom.Services;
using AggroCom.Services.Foundations.ProductOnes;
using AggroCom.Services.Orchestrations.ProductOneTableOneOrchestrationServices;
using AggroCom.Services.Processings.ProductOnes;
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
    public class ProductOneController : RESTFulController
    {
        private readonly IProductOneService productOneService;
        private readonly IProductService productService;
        private readonly string uploadsFolder = "/var/www/files";
        private readonly string baseUrl = "https://aag-group.uz:8080";
        private readonly IProductOneProcessingService productOneProcessingService;
        private readonly IProductOneTableOneOrchestrationService 
            productOneTableOneOrchestrationService;

        public ProductOneController(
            IProductOneService productOneService,
            IProductService productService,
            IProductOneProcessingService productOneProcessingService, 
            IProductOneTableOneOrchestrationService 
            productOneTableOneOrchestrationService)
        {
            this.productOneService = productOneService;
            this.productService = productService;
            this.productOneProcessingService = productOneProcessingService;
            this.productOneTableOneOrchestrationService = 
                productOneTableOneOrchestrationService;
        }

        [HttpPost]
        public async ValueTask<ActionResult<ProductOne>> PostProductOneAsync(
        [FromForm] ProductOne productOne,
        IFormFile picture,
        IFormFile icon)
        {
            try
            {
                if (productOne == null)
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

                    productOne.ProductPicture = $"{baseUrl}/files/{fileName}";
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

                    productOne.IconUrl = $"{baseUrl}/files/{iconFileName}";
                }
                else
                {
                    return BadRequest("Icon is required.");
                }

                ProductOne newProductOne = new ProductOne
                {
                    Id = productOne.Id,
                    TitleUz = productOne.TitleUz,
                    TitleRu = productOne.TitleRu,
                    ProductOneName = productOne.ProductOneName,
                    DesUz = productOne.DesUz,
                    DesRu = productOne.DesRu,
                    DescriptionUz = productOne.DescriptionUz,
                    DescriptionRu = productOne.DescriptionRu,
                    TasirModdaUz = productOne.TasirModdaUz,
                    TasirModdaRu = productOne.TasirModdaRu,
                    KimyoviySinfiUz = productOne.KimyoviySinfiUz,
                    KimyoviySinfiRu = productOne.KimyoviySinfiRu,
                    PreparatShakliUz = productOne.PreparatShakliUz,
                    PreparatShakliRu = productOne.PreparatShakliRu,
                    QadogiUz = productOne.QadogiUz,
                    QadogiRu = productOne.QadogiRu,
                    ProductPicture = productOne.ProductPicture,
                    IconUrl = productOne.IconUrl,
                    ProductType = productOne.ProductType,
                    JadvalType = productOne.JadvalType
                };

                ProductOne addedProductOne = await productOneService.AddProductOneAsync(newProductOne);

                return Created(addedProductOne);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IQueryable<ProductOne>>> GetAllProductOnes()
        {
            try
            {
                var products = await productOneService.RetrieveAllProductOnesAsync();

                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductOne>> GetProductOneById(int id)
        {
            try
            {
                var product = await productOneService.RetrieveProductOneByIdAsync(id);
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

        [HttpDelete("{productOneId}")]
        public async ValueTask<ActionResult<ProductOne>> DeleteProductOneByIdAsync(int productOneId)
        {
            try
            {
                return await this.productOneService.RemoveProductOneAsync(productOneId);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("details/{productId}")]
        public async Task<IActionResult> GetProductOneTableOneByIdAsync(int productId)
        {
            try
            {
                var product = await this.productOneTableOneOrchestrationService
                    .RetrieveProductOneTableOneByIdAsync(productId);

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

        [HttpGet("Gerbitsids")]
        public async Task<IActionResult> GetGerbitsidsAsync()
        {
            try
            {
                var gerbiseds = await this.productOneProcessingService.RetrieveAllProductOnesGepbisetsAsync();

                return Ok(gerbiseds);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Fungitsids")]
        public async Task<IActionResult> GetFungitsidsAsync()
        {
            try
            {
                var fungicidlar = await this.productOneProcessingService.
                    RetrieveAllProductOnesFungisetsAsync();

                return Ok(fungicidlar);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Insektoakaratsidlar")]
        public async Task<IActionResult> GetInsektoAkarasAsync()
        {
            try
            {
                var insektor = await this.productOneProcessingService.RetrieveAllProductOnesInsektorsAsync();

                return Ok(insektor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("Defoliantlar")]
        public async Task<IActionResult> GetDefoliantsAsync()
        {
            try
            {
                var def = await this.productOneProcessingService.RetrieveAllProductOnesDefolsAsync();

                return Ok(def);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("Sirtfaolmodda")]
        public async Task<IActionResult> GetSirtFaolsAsync()
        {
            try
            {
                var sirt = await this.productOneProcessingService.RetrieveAllProductOnesSirtFaolsAsync();

                return Ok(sirt);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Urugʻdorilagichlar")]
        public async Task<IActionResult> GetUrugdoriAsync()
        {
            try
            {
                var urdori = await this.productOneProcessingService.RetrieveAllProductOnesUrugdorisAsync();

                return Ok(urdori);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        } 
        
        [HttpGet("Ўсимликларнипрепаратлар")]
        public async Task<IActionResult> GetOsimlikPreAsync()
        {
            try
            {
                var pre = await this.productOneProcessingService.RetrieveAllProductOsimlikPresAsync();

                return Ok(pre);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest("Search query cannot be empty.");
            }

            var results = await this.productService.SearchProductsAsync(query);

            if (results == null || results.Count == 0)
            {
                return NotFound("No products found.");
            }

            return Ok(results); 
        }
    }
}
