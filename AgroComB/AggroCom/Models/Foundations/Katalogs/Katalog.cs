// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
namespace AggroCom.Models.Foundations.Katalogs
{
    public class Katalog
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FilePicture { get; set; }
        public string FilePath { get; set; }
        public long FileSize { get; set; }
        public string NameUz { get; set; }
        public string NameRu { get; set; }
        public int Type { get; set; }
    }
}

//ALTER TABLE Katalogs
//ADD COLUMN NameUz VARCHAR(255) NULL,
//ADD COLUMN NameRu VARCHAR(255) NULL;

