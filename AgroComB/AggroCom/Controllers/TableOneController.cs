// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.ProductOnes;
using AggroCom.Services.Foundations.TableOnes;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TableOneController : RESTFulController
    {
        private readonly ITableOneService tableOneService;

        public TableOneController(ITableOneService tableOneService) =>
            this.tableOneService = tableOneService;

        [HttpPost]
        public async ValueTask<ActionResult<TableOne>> PostTableOneAsync(TableOne TableOne)
        {
            try
            {
                TableOne addTableOne = new TableOne
                {
                    Id = TableOne.Id,
                    EkinTuriUz = TableOne.EkinTuriUz,
                    EkinTuriRu = TableOne.EkinTuriRu,
                    BegonaQarshiUz = TableOne.BegonaQarshiUz,
                    BegonaQarshiRu = TableOne.BegonaQarshiRu,
                    SarfMeyoriUz = TableOne.SarfMeyoriUz,
                    SarfMeyoriRu = TableOne.SarfMeyoriRu,
                    BirgaSarfUz = TableOne.BirgaSarfUz,
                    BirgaSarfRu = TableOne.BirgaSarfRu,
                    Onlsum = TableOne.Onlsum,
                    ProductOneId = TableOne.ProductOneId
                };
                return await this.tableOneService.AddTableOneAsync(addTableOne);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IQueryable<TableOne>>> GetAllTableOnes()
        {
            try
            {
                var tableOnes = await tableOneService.RetrieveAllTableOnesAsync();

                return Ok(tableOnes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error occurred while retrieving table entries.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TableOne>> GetTableOneById(int id)
        {
            try
            {
                var tableOne = await tableOneService.RetrieveTableOneByIdAsync(id);
                if (tableOne == null)
                {
                    return NotFound($"Table entry with ID {id} not found.");
                }

                return Ok(tableOne);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error occurred while retrieving TableOne with ID {id}.");
            }
        }

        [HttpDelete("{Id}")]
        public async ValueTask<ActionResult<TableOne>> DeleteTableOneByIdAsync(int Id)
        {
            try
            {
                return await this.tableOneService.RemoveTableOneAsync(Id);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
