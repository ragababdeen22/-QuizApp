using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAppApi_quiz.Models;

namespace WebAppApi_quiz.Controllers
{
    public class ParticipantController : ApiController
    {
    [HttpPost]
    [Route("api/InsertParticipant")]
    public Participant Insert(Participant model)
    {
      //using (QuizEntitiesDb db = new QuizEntitiesDb())
      using (QuizAppEntities db = new QuizAppEntities())
      {
        //db.participant_tb.Add(model);
        db.Participants.Add(model);
        db.SaveChanges();
        return model;
      }
    }
    [HttpPost]
    [Route("api/UpdateOutput")]
    //public void UpdateOutput(participant_tb model)
    public void UpdateOutput(Participant model)
    {
      //using (QuizEntitiesDb db = new  QuizEntitiesDb())
      using (QuizAppEntities db = new QuizAppEntities())
      {
        db.Entry(model).State = System.Data.Entity.EntityState.Modified;
        db.SaveChanges();
      }
    }
  }
}
