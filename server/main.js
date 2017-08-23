import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { collJobs } from '../imports/api/main.js';
import { collTitle } from '../imports/api/main.js';
import { collCountry } from '../imports/api/main.js';
import { collEthnic } from '../imports/api/main.js';
import { collReligion } from '../imports/api/main.js';
import { collMarital } from '../imports/api/main.js';
import { collState } from '../imports/api/main.js';
import { collCity } from '../imports/api/main.js';
import { collDist } from '../imports/api/main.js';

import { collSubDist } from '../imports/api/main.js';

import { collResStat } from '../imports/api/main.js';
import { collEduType } from '../imports/api/main.js';
import { collFaculty } from '../imports/api/main.js';
import { collEduMajor } from '../imports/api/main.js';
import { collCompany } from '../imports/api/main.js';
import { collIndustry } from '../imports/api/main.js';
import { collReason } from '../imports/api/main.js';
import { collJobCat } from '../imports/api/main.js';
import { collJobSubCat } from '../imports/api/main.js';
import { collLev } from '../imports/api/main.js';
import { collJobType } from '../imports/api/main.js';
import { collPostCode } from '../imports/api/main.js';
import { check } from 'meteor/check';


  Meteor.publish('edutype', function() {return collEduType.find({}, {fields : {
    'refedutypeid' : 1,'refedutypenameen' : 1
  }});});

  Meteor.publish('title', function() {return collTitle.find({}, {fields : {
    'reftitleid' : 1,'reftitlenama' : 1
  }});});

  Meteor.publish('country', function() {return collCountry.find({}, {sort:{refcountryname:1}, fields : {
    'refcountryid' : 1,'refcountryname' : 1
  }});});

  Meteor.publish('ethnic', function() {return collEthnic.find({}, {fields : {
    'refethnicid' : 1,'refethnicname' : 1
  }});});

  Meteor.publish('religion', function() {return collReligion.find({}, {fields : {
    'refreligionid' : 1,'refreligionnameen' : 1
  }});});

  Meteor.publish('marital', function() {return collMarital.find({}, {fields : {
    'refmaritalid' : 1,'refmaritalnameen' : 1
  }});});

  Meteor.publish('state', function() {return collState.find({}, {sort:{refstatename:1}, fields : {
    'refstateid' : 1,'refstatename' : 1
  }});});

  Meteor.publish('city', function() {return collCity.find({}, {sort:{refcityname:1}, fields : {
    'refcityid' : 1,'refcityname' : 1,'refcitystateid':1
  }});});

  Meteor.publish('resstat', function() {return collResStat.find({}, {fields : {
    'refresidentstatusid' : 1,'refresidentstatusnameen' : 1
  }});});

  Meteor.publish('postcode', function() {return collPostCode.find({}, {fields : {
    'refpostcodecode' : 1,'refpostcodedistrictid' : 1
  }});});

  Meteor.publish('subdist', function(a) {
    if (a!='') {
      return collSubDist.find({refsubdistrictname:{$regex:a, $options:'i'}}, {fields : {
    'refsubdistrictdistrictid' : 1,'refsubdistrictname' : 1
  }});
    }
});

  Meteor.publish('faculty', function() {return collFaculty.find({}, {fields : {
    '_id' : 1,'name' : 1
  }});});

  Meteor.publish('edumajor', function() {return collEduMajor.find({}, {fields : {
    '_id' : 1,'nameen' : 1
  }});});



  Meteor.publish('dist', function() {return collDist.find({}, {fields : {
    'refdistrictcityid' : 1,'refdistrictname' : 1, 'refdistrictid':1
  }});});

   Meteor.publish('company', function() {return collCompany.find({}, {fields : {
    'refcompanytypenameen' : 1,'refcompanytypeid' : 1
  }});});

  Meteor.publish('industry', function() {return collIndustry.find({}, {fields : {
    'refindustritypeid' : 1,'refindustritypenameen' : 1
  }});
  // console.log(a);
});

  Meteor.publish('reason', function() {return collReason.find({}, {fields : {
    'refreasonleaveid' : 1,'refreasonleavename' : 1
  }});});

  Meteor.publish('jobcat', function() {return collJobCat.find({}, {fields : {
    'refjobcategoryid' : 1,'refjobcategorynameen' : 1
  }});});

  Meteor.publish('jobsubcat', function() {return collJobSubCat.find({}, {fields : {
    'refjobsubcategorynameen' : 1,'refjobsubcategoryid' : 1
  }});});

  Meteor.publish('joblevel', function() {return collLev.find({}, {fields : {
    'reflevelid' : 1,'reflevelnameen' : 1
  }});});

  Meteor.publish('jobtype', function() {return collJobType.find({}, {fields : {
    'refvacancytypeid' : 1,'refvacancytypenameen' : 1
  }});});

  Meteor.publish('jobs', function(a, b, c, d, e) {
    let s = a;
    let f_nm = {$regex:b, $options:'i'};
    let f_act = c;
    let f_ver = d;
    let f_val = e;
    // console.log(f_nm);

    if (b != '') {
      return collJobs.find({$or: [ { firstname: f_nm }, { activesatus: f_nm }, { email : f_nm }, { firstname: f_nm }, ]}, 
        { 
            sort:{lastname:1},
            limit:10,
            skip:s
        });
    }
    else if (c != "") {
      return collJobs.find({activestatus:f_act}, 
        { 
            sort:{lastname:1},
            limit:10,
            skip:s
        });
    }
    else if (d != "") {
      return collJobs.find({statusemail:f_ver}, 
        { 
            sort:{lastname:1},
            limit:10,
            skip:s
        });
    }
    else if (e != "") {
      return collJobs.find({validstatus:f_val}, 
        { 
            sort:{lastname:1},
            limit:10,
            skip:s
        });
    }
    else{
      return collJobs.find({},
        { 
            sort:{lastname:1},
            limit:10,
            skip:s
        });
    }
    
  });
  
Meteor.methods({
  'collJobs.update'(
    id, 
    firstnm, 
    lastnm, 
    mobile, 
    email, 
    address, 
    title, 
    nation, 
    ethnic, 
    religion, 
    marital, 
    state, 
    city, 
    resstat,
    allow,
    gender,
    bop,
    education,
    exp
  ){
    collJobs.update(id, { $set: {
      firstname: firstnm,
      lastname:lastnm, 
      mobilephone:mobile,
      email:email,
      address_living:address,
      titleid:title,
      countryid:nation,
      ethnicity:ethnic,
      religionid:religion,
      marital:marital,
      stateid:state,
      cityid:city,
      residentstatus:resstat,
      gender:gender,
      workinindo:allow,
      bop:bop,
      education:education, 
     _exp:exp 
    } 
  });
  },
  'collJobs.remove'(id, text){
    check(id, String);
    collJobs.remove(id);
  },
  'collJobs.add.education'(id){
    collJobs.update(
    {"_id" : id}, 
    {
      $push:
      {
        "education":
        {
          $each:[
          {
            "_id":"",
            "typeid" : "0",
            "countrycitytext" : "None",
            "faculty" : "0",
            "major" : "0",
            "name" : "None",
            "startyear" : "None",
            "endyear" : "None",
            "gpa" : "0.0",
            "gpaoutof" : "0.0"
          }]
        }
      }
    });
  }, 
'collJobs.add.exp'(id){
  collJobs.update(
    {"_id" : id}, 
    {
      $push:
      {
        "_exp":
        {
          $each:[                
          {
            "_id":"",
            companyname:"None", 
            companytitle:"0", 
            industrytype:"0", 
            citytext:"None", 
            companyweb:"None", 
            terminationreason:"0",
            _detail:[
            {
              jobtitle:"None",
              categoryid:"0",
              subcategoryid:"0",
              joblevel:"0",
              jobtype:"0"
            }]
          }
        ]
      }
    }
  })
},

'collJobs.del.ed'(id, param){
  collJobs.update(
    {"_id" : id}, 
    {
      $push:
      {
        "education":
        {
          $slice:[                
          {
            "_id":param
          }
        ]
      }
    }
  })
},

});