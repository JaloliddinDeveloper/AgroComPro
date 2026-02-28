// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Brokers.Storages;
using AggroCom.Models.Foundations.ProductTwos;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.ProductTwos
{
    public class ProductTwoService : IProductTwoService
    {
        private readonly IStorageBroker storageBroker;

        public ProductTwoService(IStorageBroker storageBroker)=>
            this.storageBroker = storageBroker;
        
        public async ValueTask<ProductTwo> AddProductTwoAsync(ProductTwo productTwo)=>
            await this.storageBroker.InsertProductTwoAsync(productTwo);
       
        public async ValueTask<IQueryable<ProductTwo>> RetrieveAllProductTwosAsync()=>
            await this.storageBroker.SelectAllProductTwosAsync();

        public async ValueTask<ProductTwo> RetrieveProductTwoByIdAsync(int productTwoId)=>
            await this.storageBroker.SelectProductTwoByIdAsync(productTwoId);

        public async ValueTask<ProductTwo> ModifyProductTwoAsync(ProductTwo productTwo)=>
            await this.storageBroker.UpdateProductTwoAsync(productTwo);
       
        public async ValueTask<ProductTwo> RemoveProductTwoAsync(int productTwoId)
        {
            ProductTwo maybeProductTwo=await this.storageBroker.
                SelectProductTwoByIdAsync(productTwoId);

            return await this.storageBroker.DeleteProductTwoAsync(maybeProductTwo);
        }
    }
}
