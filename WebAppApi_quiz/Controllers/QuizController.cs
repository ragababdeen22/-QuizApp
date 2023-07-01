using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAppApi_quiz.Models;

namespace WebAppApi_quiz.Controllers
{
    public class QuizController : ApiController
    {
    [HttpGet]
    [Route("api/Questions")]
    public HttpResponseMessage GetQuestions()
    {
      //using (QuizEntitiesDb db = new QuizEntitiesDb())
      using (QuizAppEntities db = new QuizAppEntities())
      {
        //var Qns = db.Questions_tb
        var Qns = db.Questions
            .Select(x => new { QsID = x.QnID, Qs = x.Qn, ImageName = x.ImageName, x.Option1, x.Option2, x.Option3, x.Option4 })
            .OrderBy(y => Guid.NewGuid())
            .Take(10)
            .ToArray();
        var updated = Qns.AsEnumerable()
            .Select(x => new
            {
              QnID = x.QsID,
              Qs = x.Qs,
              ImageName = x.ImageName,
              Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4 }
            }).ToList();
        return this.Request.CreateResponse(HttpStatusCode.OK, updated);
      }
    }

    [HttpPost]
    [Route("api/Answers")]
    public HttpResponseMessage GetAnswers(int[] qIDs)
    {
      //using (QuizEntitiesDb db = new QuizEntitiesDb())
      using (QuizAppEntities db = new QuizAppEntities())
      {
        //var result = db.Questions_tb
        var result = db.Questions
           .AsEnumerable()
             .Where(y => qIDs.Contains(y.QnID))
             .OrderBy(x => { return Array.IndexOf(qIDs, x.QnID); })
             .Select(z => z.Answer)
             .ToArray();
        return this.Request.CreateResponse(HttpStatusCode.OK, result);
      }
    }

  }
}
