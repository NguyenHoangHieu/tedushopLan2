using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeduShop.Web.Models
{
    public class PostTagViewModel
    {
        public int PostID { get; set; }

        public string TagtID { get; set; }

        public virtual TagViewModel Tag { get; set; }

        public virtual PostViewModel Post { get; set; }
    }
}