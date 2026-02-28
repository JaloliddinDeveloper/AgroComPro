// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.Contacts;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Brokers.Storages
{
    public partial interface IStorageBroker
    {
        ValueTask<Contact> InsertContactAsync(Contact Contact);
        ValueTask<IQueryable<Contact>> SelectAllContactsAsync();
        ValueTask<Contact> SelectContactByIdAsync(int ContactId);
        ValueTask<Contact> UpdateContactAsync(Contact Contact);
        ValueTask<Contact> DeleteContactAsync(Contact Contact);
    }
}
