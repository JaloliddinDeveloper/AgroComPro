// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Brokers.Storages;
using AggroCom.Models.Foundations.ProductOnes;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.ProductOnes
{
    public class ProductOneService: IProductOneService
    {
        private readonly IStorageBroker storageBroker;

        public ProductOneService(IStorageBroker storageBroker) =>
            this.storageBroker = storageBroker;

        public async ValueTask<ProductOne> AddProductOneAsync(ProductOne productOne) =>
            await this.storageBroker.InsertProductOneAsync(productOne);

        public async ValueTask<IQueryable<ProductOne>> RetrieveAllProductOnesAsync() =>
           await this.storageBroker.SelectAllProductOnesAsync();

        public async ValueTask<ProductOne> RetrieveProductOneByIdAsync(int productOneId) =>
            await this.storageBroker.SelectProductOneByIdAsync(productOneId);

        public async ValueTask<ProductOne> ModifyProductOneAsync(ProductOne productOne) =>
            await this.storageBroker.UpdateProductOneAsync(productOne);

        public async ValueTask<ProductOne> RemoveProductOneAsync(int ProductOneId)
        {
            ProductOne maybeProductOne = await this.storageBroker.SelectProductOneByIdAsync(ProductOneId);
            return await this.storageBroker.DeleteProductOneAsync(maybeProductOne);
        }
    }
}
