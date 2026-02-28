// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Orchestrations.ProductTwos;
using System.Threading.Tasks;

namespace AggroCom.Services.Orchestrations.ProductTwoTableTwoOrchestrations
{
    public interface IProductTwoTableTwoOrchestrationService
    {
        ValueTask<ProductTwoTableTwo> RetrieveProductTwoTableTwoByIdAsync(int productId);
    }
}
