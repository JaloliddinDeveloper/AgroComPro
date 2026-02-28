// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------

using AggroCom.Models.Foundations.Photos;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.Photos
{
    public interface IPhotoService
    {
        ValueTask<Photo> RemovePhotoAsync(int Id);
    }
}
