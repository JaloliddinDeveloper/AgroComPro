// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.ProductOnes;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.TableOnes
{
    public interface ITableOneService
    {
        ValueTask<TableOne> AddTableOneAsync(TableOne tableOne);
        ValueTask<IQueryable<TableOne>> RetrieveAllTableOnesAsync();
        ValueTask<TableOne> RetrieveTableOneByIdAsync(int tableOneId);
        ValueTask<TableOne> ModifyTableOneAsync(TableOne tableOne);
        ValueTask<TableOne> RemoveTableOneAsync(int tableOneId);
    }
}
