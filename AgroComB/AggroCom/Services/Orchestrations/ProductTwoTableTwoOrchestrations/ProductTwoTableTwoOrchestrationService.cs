// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Orchestrations.ProductTwos;
using AggroCom.Services.Foundations.ProductTwos;
using AggroCom.Services.Foundations.TableTwos;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Orchestrations.ProductTwoTableTwoOrchestrations
{
    public class ProductTwoTableTwoOrchestrationService : IProductTwoTableTwoOrchestrationService
    {
        private readonly IProductTwoService productTwoService;
        private readonly ITableTwoService tableTwoService;

        public ProductTwoTableTwoOrchestrationService(
            IProductTwoService productTwoService, 
            ITableTwoService tableTwoService)
        {
            this.productTwoService = productTwoService;
            this.tableTwoService = tableTwoService;
        }

        public async ValueTask<ProductTwoTableTwo> RetrieveProductTwoTableTwoByIdAsync(int productId)
        {
            var product = (await this.productTwoService.RetrieveAllProductTwosAsync())
                .FirstOrDefault(p => p.Id == productId);

            if (product == null)
            {
                return null;
            }

            var tableTwos = (await this.tableTwoService.RetrieveAllTableTwosAsync())
                .Where(t => t.ProductTwoId == product.Id).ToList();

            return new ProductTwoTableTwo
            {
                ProductTwo = product,
                TableTwo = tableTwos
            };
        }
    }
}
