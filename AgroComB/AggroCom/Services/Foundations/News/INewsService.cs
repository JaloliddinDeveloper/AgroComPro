// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.News;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.News
{
    public interface INewsService
    {
        ValueTask<New> RemoveNewsAsync(int newId);
    }
}
