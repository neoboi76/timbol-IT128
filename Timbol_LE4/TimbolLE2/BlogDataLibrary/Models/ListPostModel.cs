using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogDataLibrary.Models
{
    public class ListPostModel
    {

        public int Id { get; set; }
        public String Title { get; set; }

        public String Body { get; set; }

        public DateTime DateCreated { get; set; }

        public String UserName { get; set; }

        public String FirstName { get; set; }

        public String LastName { get; set; }


    }
}
