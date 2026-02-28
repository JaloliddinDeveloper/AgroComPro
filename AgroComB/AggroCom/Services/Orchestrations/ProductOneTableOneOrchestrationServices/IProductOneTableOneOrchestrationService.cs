// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Orchestrations.ProductOnes;
using System.Threading.Tasks;

namespace AggroCom.Services.Orchestrations.ProductOneTableOneOrchestrationServices
{
    public interface IProductOneTableOneOrchestrationService
    {
        ValueTask<ProductOneTableOne> RetrieveProductOneTableOneByIdAsync(int productId);
    }
}
