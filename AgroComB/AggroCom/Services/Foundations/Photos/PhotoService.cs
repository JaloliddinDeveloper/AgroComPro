// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Brokers.Storages;
using AggroCom.Models.Foundations.Photos;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.Photos
{
    public class PhotoService : IPhotoService
    {
        private readonly IStorageBroker storageBroker;

        public PhotoService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        public async ValueTask<Photo> RemovePhotoAsync(int Id)
        {
            Photo maybePhoto=await storageBroker.SelectPhotoByIdAsync(Id);

            return await this.storageBroker.DeletePhotoAsync(maybePhoto);
        }
    }
}
