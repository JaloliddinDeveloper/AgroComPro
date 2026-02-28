// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Services.Foundations.TableTwos;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System.Linq;
using System.Threading.Tasks;
using System;
using AggroCom.Models.Foundations.ProductTwos;

namespace AggroCom.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TableTwoController : RESTFulController
    {
        private readonly ITableTwoService TableTwoService;

        public TableTwoController(ITableTwoService TableTwoService) =>
            this.TableTwoService = TableTwoService;

        [HttpPost]
        public async ValueTask<ActionResult<TableTwo>> PostTableTwoAsync(TableTwo TableTwo)
        {
            try
            {
                return await this.TableTwoService.AddTableTwoAsync(TableTwo);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IQueryable<TableTwo>>> GetAllTableTwos()
        {
            try
            {
                var TableTwos = await TableTwoService.RetrieveAllTableTwosAsync();

                return Ok(TableTwos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error occurred while retrieving table entries.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TableTwo>> GetTableTwoById(int id)
        {
            try
            {
                var TableTwo = await TableTwoService.RetrieveTableTwoByIdAsync(id);
                if (TableTwo == null)
                {
                    return NotFound($"Table entry with ID {id} not found.");
                }

                return Ok(TableTwo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error occurred while retrieving TableTwo with ID {id}.");
            }
        }

        [HttpDelete("{Id}")]
        public async ValueTask<ActionResult<TableTwo>> DeleteTableTwoByIdAsync(int Id)
        {
            try
            {
                return await this.TableTwoService.RemoveTableTwoAsync(Id);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
