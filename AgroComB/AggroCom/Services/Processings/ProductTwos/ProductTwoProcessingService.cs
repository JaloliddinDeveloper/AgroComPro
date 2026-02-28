// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.ProductTwos;
using AggroCom.Services.Foundations.ProductTwos;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Processings.ProductTwos
{
    public class ProductTwoProcessingService : IProductTwoProcessingService
    {
        private readonly IProductTwoService productTwoService;

        public ProductTwoProcessingService(IProductTwoService productTwoService)=>
            this.productTwoService = productTwoService;

        public async ValueTask<IQueryable<ProductTwo>> RetrieveAllProductTwosBiostimulyatorAsync()=>
             (await this.productTwoService.RetrieveAllProductTwosAsync())
                    .Where(product => product.ProductTwoType == ProductTwoType.Biostimulyator);

        public async ValueTask<IQueryable<ProductTwo>> RetrieveAllProductTwosMikroelementAsync() =>
             (await this.productTwoService.RetrieveAllProductTwosAsync())
                    .Where(product => product.ProductTwoType == ProductTwoType.Mikroelement); 
        
        public async ValueTask<IQueryable<ProductTwo>> RetrieveAllProductTwosNpkAsync() =>
             (await this.productTwoService.RetrieveAllProductTwosAsync())
                    .Where(product => product.ProductTwoType == ProductTwoType.Npk);

        public async ValueTask<IQueryable<ProductTwo>> RetrieveAllProductTwosOrganikAsync()=>
             (await this.productTwoService.RetrieveAllProductTwosAsync())
                    .Where(product => product.ProductTwoType == ProductTwoType.Organik);

    }
}
