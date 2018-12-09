using AutoMapper;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TeduShop.Model.Models;
using TeduShop.Service;
using TeduShop.Web.Infrastructure.Core;
using TeduShop.Web.Infrastructure.Extentions;
using TeduShop.Web.Models;

namespace TeduShop.Web.Api
{
    [RoutePrefix("api/postcategory")]
    public class PostCategoryController : ApiControllerBase
    {
        private IPostCategoryService _postCategoryService;

        public PostCategoryController(IErrorService errorService, IPostCategoryService postCategoryService) : base(errorService)
        {
            this._postCategoryService = postCategoryService;
        }

        [Route("getall")]
        //GetPostCategory_API
        public HttpResponseMessage Get(HttpRequestMessage requestMessage)
        {
            return CreateHttpResponse_TuViet(requestMessage, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var listCategory = _postCategoryService.GetAll();

                    var listPostCategory = Mapper.Map<List<PostCategoryViewModel>>(listCategory);

                    response = requestMessage.CreateResponse(HttpStatusCode.OK, listPostCategory);
                }
                return response;
            });
        }

        [Route("add")]
        //CreatePostCategory_API
        public HttpResponseMessage Post(HttpRequestMessage requestMessage, PostCategoryViewModel postCategoryVm)
        {
            return CreateHttpResponse_TuViet(requestMessage, () =>
           {
               HttpResponseMessage response = null;
               if (!ModelState.IsValid)
               {
                   Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
               }
               else
               {
                   PostCategory newPostCategory = new PostCategory();
                   newPostCategory.UpdatePostCategory(postCategoryVm);

                   var category = _postCategoryService.Add(newPostCategory);
                   _postCategoryService.Save();
                   response = requestMessage.CreateResponse(HttpStatusCode.Created, category);
               }
               return response;
           });
        }

        [Route("update")]
        //UpdatePostCategory_API
        public HttpResponseMessage Put(HttpRequestMessage requestMessage, PostCategoryViewModel postCategoryVm)
        {
            return CreateHttpResponse_TuViet(requestMessage, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var postCategoryDB = _postCategoryService.GetById(postCategoryVm.ID);
                    postCategoryDB.UpdatePostCategory(postCategoryVm);

                    _postCategoryService.Update(postCategoryDB);
                    _postCategoryService.Save();
                    response = requestMessage.CreateResponse(HttpStatusCode.OK);
                }
                return response;
            });
        }

        //DeletePostCategory_API
        public HttpResponseMessage Delete(HttpRequestMessage requestMessage, int id)
        {
            return CreateHttpResponse_TuViet(requestMessage, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    _postCategoryService.Delete(id);
                    _postCategoryService.Save();
                    response = requestMessage.CreateResponse(HttpStatusCode.OK);
                }
                return response;
            });
        }
    }
}