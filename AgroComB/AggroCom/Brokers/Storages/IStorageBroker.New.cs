// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.News;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Brokers.Storages
{
    public partial interface IStorageBroker
    {
        ValueTask<New> InsertNewAsync(New New);
        ValueTask<IQueryable<New>> SelectAllNewsAsync();
        ValueTask<New> SelectNewByIdAsync(int NewId);
        ValueTask<New> UpdateNewAsync(New New);
        ValueTask<New> DeleteNewAsync(New New);

        ValueTask<IQueryable<New>> SelectAllNewsOrderAsync();
    }
}
