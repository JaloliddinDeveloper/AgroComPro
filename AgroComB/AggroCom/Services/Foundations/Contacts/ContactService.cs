// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Brokers.Storages;
using AggroCom.Models.Foundations.Contacts;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.Contacts
{
    public class ContactService : IContactService
    {
        private readonly IStorageBroker storageBroker;

        public ContactService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        public async ValueTask<Contact> RemoveContactAsync(int contactId)
        {
            Contact maybeContact=await this.storageBroker.SelectContactByIdAsync(contactId);

            return await this.storageBroker.DeleteContactAsync(maybeContact);
        }
    }
}
