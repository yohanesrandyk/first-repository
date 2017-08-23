import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
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
import './main.html';
Meteor.subscribe('edutype');
Meteor.subscribe('title');
Meteor.subscribe('country');
Meteor.subscribe('ethnic');
Meteor.subscribe('religion');
Meteor.subscribe('marital');
Meteor.subscribe('state');
Meteor.subscribe('city');
Meteor.subscribe('resstat');
Meteor.subscribe('faculty');
Meteor.subscribe('edumajor');
Meteor.subscribe('company');
Meteor.subscribe('industry');
Meteor.subscribe('reason');
Meteor.subscribe('jobcat');
Meteor.subscribe('jobsubcat');
Meteor.subscribe('joblevel');
Meteor.subscribe('jobtype');

Session.set('id', '');
Session.set('nm', '');
Session.set('act_stat', '');
Session.set('ver_stat', '');
Session.set('val_stat', '');
Session.set('search_loc', '');
Session.set('print_ed', 1);

var find;

Router.route('/page/:_page', function () {
  let params = this.params;
  let page = params._page;
  this.render('page');
  Session.set('page', page);
});

Router.route('/', function(){
  Router.go('/page/1');
});

Router.route('/page/:_page/:_id', function () {
  let params = this.params;
  let page = params._page;
  let id = params._id;
  Session.set('page', page);
  Session.set('id', id);
  this.render('update');
});

Template.page.onCreated(function pageOnCreated() {
  this.state = new ReactiveDict();
});

function sub() {
  let a = Session.get('page') - 1;
  let b = a * 10;
  let c = Session.get('nm');
  let d = Session.get('act_stat');
  let e = Session.get('ver_stat');
  let f = Session.get('val_stat');
  Meteor.subscribe('jobs', b, c, d, e, f);
  find = collJobs.find({}).fetch();
};

var companies = [];
var educations = [];
// var mongo_edu =[];
// var mongo_comp =[];

function education() {
	sub();
      	let d = Session.get('id');
      	let b = collJobs.find({_id : d}).fetch();
      	let refedutype = collEduType.find().fetch();
      	let reffaculty = collFaculty.find().fetch();
      	let refedumajor = collEduMajor.find().fetch();
      	educations = [];

      	for(x in b){
        let education = b[x].education;
        for(y in education){
            let educationtype = [];
      	    let educationfaculty = [];
      	    let educationmajor = [];
            let typeed = education[y].typeid;
            let faculty = education[y].faculty;
            let nm = education[y].name;
            let gpaoutof = education[y].gpaoutof;
            let gpa = education[y].gpa;
            let city = education[y].countrycitytext;
            let major = education[y].major;
            let startyear = education[y].startyear.substr(0, 4);
            let endyear = education[y].endyear.substr(0, 4);
            let edutypeid;
            let faculty_id;
            let major_id;

            for(z in refedutype){
              let id = refedutype[z].refedutypeid;
              let name = refedutype[z].refedutypenameen;
              let select = '';
              if (id == typeed) {
                select = "Selected";
                edutypeid = id;
              }
              educationtype[z] = {id:id, name:name, select:select};

              // console.log(educationtype);
            }
            // console.log(educationtype);

            for(z in reffaculty){
              let id = reffaculty[z]._id;
              let name = reffaculty[z].name;
              let select = '';
              if (id == faculty) {
                select = "Selected";
                faculty_id = id;
              }
              educationfaculty[z] = {id:id, name:name, select:select};
            // console.log(educationfaculty);
            }

            for(z in refedumajor){
              let id = refedumajor[z]._id;
              let name = refedumajor[z].nameen;
              let select = '';
              if (id == major) {
                select = "Selected";
                major_id = id;
              }
              educationmajor[z] = {id:id, name:name, select:select};
            // console.log(educationmajor);

            }

            educations[y] = {id:y, nm:nm, startyear:startyear, endyear:endyear, gpa:gpa, gpaoutof:gpaoutof, city:city, educationtype:educationtype, educationfaculty:educationfaculty, educationmajor:educationmajor};	
        }
        console.log(educations);
      }
}

function company(argument) {
	sub();
      let d = Session.get('id');
      let b = collJobs.find({_id : d}).fetch();
      let refcompany = collCompany.find().fetch();
      let refindustry = collIndustry.find().fetch();
      let refreason = collReason.find().fetch();
      let refjobcategory = collJobCat.find().fetch();
      let refjobsubcategory = collJobSubCat.find().fetch();
      let reflevel = collLev.find().fetch();
      let refvacancy = collJobType.find().fetch();
      companies = [];

      for(x in b){
        let exp = b[x]._exp;
        for(y in exp){
          let companytype = [];
	      let industrytype = [];
	      let reasontype = [];
	      let jobcategory = [];
	      let jobsubcategory = [];
	      let joblevel = [];
	      let jobvacancy = [];
          let nm = exp[y].companyname;
          let loc = exp[y].citytext;
          let web = exp[y].companyweb;
          let detail = exp[y]._detail;
          let jobtitle = detail[0].jobtitle;
          let companytitle = exp[y].companytitle;
          let industrytitle = exp[y].industrytype;
          let reasontitle = exp[y].terminationreason;
          let jobcattitle = detail[0].categoryid;
          let jobsubcat = detail[0].subcategoryid;
          let joblev = detail[0].joblevel;
          let jobvacan = detail[0].jobtype;
          
          for(z in refcompany){
            let id = refcompany[z].refcompanytypeid;
            let name = refcompany[z].refcompanytypenameen;
            let select='';
            if (id == companytitle) {
              select = "Selected";
            }
            companytype[z] = {id:id, name:name, select:select};
          }
          for(z in refindustry){
            let id = refindustry[z].refindustritypeid;
            let name = refindustry[z].refindustritypenameen;
            let select='';
            if (id == industrytitle) {
              select = "Selected";
            }
            industrytype[z] = {id:id, name:name, select:select};
          }
          for(z in refreason){
            let id = refreason[z].refreasonleaveid;
            let name = refreason[z].refreasonleavename;
            let select='';
            if (id == reasontitle) {
              select = "Selected";
            }
            reasontype[z] = {id:id, name:name, select:select};
          }
          for(z in refjobcategory){
            let id = refjobcategory[z].refjobcategoryid;
            let name = refjobcategory[z].refjobcategorynameen;
            let select='';
            if (id == jobcattitle) {
              select = "Selected";
            }
            jobcategory[z] = {id:id, name:name, select:select};
          }

          for(z in refjobsubcategory){
            let id = refjobsubcategory[z].refjobsubcategorycategoryid;
            let name = refjobsubcategory[z].refjobsubcategorynameen;
            let select = '';
            if(id == jobsubcat){
              select = "Selected"
            }
            jobsubcategory[z] = {id:id, name:name, select:select}
          }

          for(z in reflevel){
            let id = reflevel[z].reflevelid;
            let name = reflevel[z].reflevelnameen;
            let select = '';
            if(id == joblev){
              select = "Selected"
            }
            joblevel[z] = {id:id, name:name, select:select} 
          }

          for(z in refvacancy){
          	let id = refvacancy[z].refvacancytypeid;
          	let name = refvacancy[z].refvacancytypenameen;
          	let select = '';
          	if(id == jobvacan){
          		select = "Selected"
          	}
          	jobvacancy[z] = {id:id, name:name, select:select}
          }
          companies[y] = {id:y, nm : nm, loc: loc, web:web, jobtitle:jobtitle, companytype:companytype, industrytype:industrytype, reasontype:reasontype, jobcategory:jobcategory, jobsubcategory:jobsubcategory, joblevel:joblevel, jobvacancy:jobvacancy};
       	  // mongo_comp[y] = {};
       }
       console.log(companies);
      }
}

Template.page.helpers({
  print_tbl: function() {
    sub();
    let arr = [];
    for(x in find){
      let no = parseInt(x) + 1;
      let id = find[x]._id;
      let lastup = find[x].lastupdate.toString().substr(4, 11);
      let lastlog;
      if(typeof find[x].lastlogin != 'undefined'){
        lastlog = find[x].lastlogin.toString().substr(4, 11);
      }else{
        lastlog = '-';
      }
      let nm = find[x].lastname + ' ' + find[x].firstname;
      let mail = find[x].email;
      let ver;
      let tmpVer = find[x].statusemail;
      if (tmpVer == 1) {
        ver = "Waiting";
      }else{
        ver = "Verified";
      };
      let act;
      let tmpAct = find[x].activestatus;
      if (tmpAct == 1) {
        act = "Active";
      }else if(d == 2){
        act = "Suspend";
      }else{
        act = "Deactivate";
      }
      let val;
      let tmpVal = find[x].validstatus;
      if (tmpVal == 1) {
        val = "Never";
      }else if(tmpVal == 2){
        val = "Pending";
      }else if(tmpVal == 3){
        val = "Parsing";
      }else if(tmpVal == 4){
        val = "Requested";
      }else{
        val = "Validated";
      }
      arr[x] = {_id:id, no:no, lastup:lastup, lastlog:lastlog, nm:nm, mail:mail, ver:ver, act:act, val:val};
    }
    return arr;
  },
  'print_tbl_1':function(){
    sub();
    let d = Session.get('id');
    let arr = [];
    let lastup = ''; 
    let lastlog = ''; 
    let nm = '';
    let mail = ''; 
    let phone = ''; 
    let mobile = ''; 
    let tmpact = ''; 
    let act = ''; 
    let tmplastlog = '';
    if(d != ''){
      let b = collJobs.find({_id : d}).fetch();
        nm = b[0].lastname + ' ' + b[0].firstname;
        mail = b[0].email;
        phone = b[0].phone;
        mobile = b[0].mobilephone;
        tmplastlog = b[0].lastlogin;
        if (typeof tmplastlog != 'undefined') {
          lastlog = tmplastlog.toString().substr(4, 11);
        }else{
          lastlog = "Null";
        }
        lastup = b[0].lastupdate.toString().substr(4, 11);
        tmpact = b[0].activestatus;
        if (tmpact == 1) {
          act = "Active";
        }else if(tmpact == 2){
          act = "Suspend";
        }else{
          act = "Deactivate";
      }
    }else{
      lastup = '';
      lastlog = '';
      nm = '';
      mail = '';
      phone = '';
      mobile = '';
      act = '';
    }
    arr[0] = {nm, mail, phone, mobile, lastlog, lastup, act};
    return arr;
  },

  print_act_check:function(){
    let arr = []
    let name = ''
    for(let i = 1; i <=3; i++){
      if (i == 1) {
        name = "Active";
      }else if(i == 2){
        name = "Suspend";
      }else{
        name = "Deactivate";
      }
      arr[i] = {_id:i, text : name};
    }
    return arr;
  },

  print_ver_check:function(){
    let arr = []
    let name = ''
    for(let i = 1; i <=2; i++){
      if (i == 1) {
        name = "Waiting";
      }else{
        name = "Verified";
      }
      arr[i] = {_id:i, text : name};
    }
    return arr;
  },

  print_val_check:function(){
    let arr = []
    let name = ''
    for(let i = 1; i <= 5; i++){
      if (i == 1) {
        name = "Never";
      }else if(i == 2){
        name = "Pending";
      }else if(i == 3){
        name = "Parsing";
      }else if(i == 4){
        name = "Requested";
      }else{
        name = "Validated";
      }
      arr[i] = {_id:i, text : name};
    }
    return arr;
  },

  page: function(){
    return Session.get('page');
  },
});

Template.page.events({
  'submit .go': function(e){
    e.preventDefault();
    let target = e.target;
    let text = target.text.value;
    if (text >= 1 && text <= 103) {
      let page = parseInt(text);
      Session.set('page', page);
      Router.go('/page/' + page);
      target.text.value = '';
    }
  },


  'click .next':function(e){

    e.preventDefault();
    if (Session.get('page') < 103) {
      let page = parseInt(Session.get('page')) + 1;
      Session.set('id', '');
      Router.go('/page/' + page);
    }

  },

  'click .prev':function(e){

    e.preventDefault();
    if (Session.get('page') > 1) {
      let page = parseInt(Session.get('page')) - 1;
      Session.set('id', '');
      Router.go('/page/' + page);
    };

  },

  'click .row':function(e) {
    e.preventDefault();
    let page = parseInt(Session.get('page'));
    let a = this._id;
    Session.set('id', a);
  },

  'dblclick .row':function(e) {
    e.preventDefault();
    let page = parseInt(Session.get('page'));
    let a = this._id;
    Session.set('id', a);
    Router.go('/page/' + page + '/' + a);
  },

  'submit .find':function(e){
    e.preventDefault();
    Session.set('nm', '');
    Session.set('act_stat', '');
    Session.set('ver_stat', '');
    Session.set('val_stat', '');
    let target = e.target;
    let text = target.text.value;
    Session.set('nm', text);
    Router.go('/page/1');
    Session.set('id', '');
  },

  'click .act':function(e){
      Session.set('nm', '');
      Session.set('act_stat', '');
      Session.set('ver_stat', '');
      Session.set('val_stat', '');
      let a = this._id;
      Session.set('act_stat', a);
      Router.go('/page/1');
      Session.set('id', '');
  },

  'click .ver':function(e){
      Session.set('nm', '');
      Session.set('act_stat', '');
      Session.set('ver_stat', '');
      Session.set('val_stat', '');
      Session.set('nm', '');
      let a = this._id;
      Session.set('ver_stat', a);
      Session.set('id', '');
      Router.go('/page/1');
      Session.set('id', '');
  },

  'click .val':function(e){
      Session.set('nm', '');
      Session.set('act_stat', '');
      Session.set('ver_stat', '');
      Session.set('val_stat', '');
      let a = this._id;
      Session.set('val_stat', a);
      Session.set('id', '');
      Router.go('/page/1');
      Session.set('id', '');
  },
  'click .def':function(e){
      Session.set('nm', '');
      Session.set('act_stat', '');
      Session.set('ver_stat', '');
      Session.set('val_stat', '');
      Session.set('id', '');
  },
});


Template.update.helpers({
  print_all:function(){
    sub();
    let d = Session.get('id');
    let b = collJobs.find({_id : d});
    return b;
  },
  print_title:function(){
    sub();
    let d = Session.get('id');
    let b = collJobs.find({_id : d}).fetch();
    let relatedcoll = collTitle.find().fetch();
    let arr = []
    for(x in relatedcoll){
      
      let id = relatedcoll[x].reftitleid;
      let name = relatedcoll[x].reftitlenama;
      let jobsrelatedid = '';
      let select='';

      for(y in b){
        jobsrelatedid = b[0].titleid;
      }
      if (id == jobsrelatedid) {
        select = "Selected";
      }
      arr[x] = {id:id, name:name, select:select}
    }
    return arr;
    // console.log(relatedcoll);
  },
  print_nation:function(){
    sub();
    let d = Session.get('id');
    let b = collJobs.find({_id : d}).fetch();
    let relatedcoll = collCountry.find().fetch();
    let arr = []
    for(x in relatedcoll){
      let id = relatedcoll[x].refcountryid;
      let name = relatedcoll[x].refcountryname;
      let jobsrelatedid = '';
      let select='';
      for(y in b){
        jobsrelatedid = b[0].countryid;
      }
      if (id == jobsrelatedid) {
        select = "Selected";
      }
      arr[x] = {id:id, name:name, select:select}
    }
    return arr;
  },
  print_ethnic:function(){
    sub();
    let d = Session.get('id');
    let b = collJobs.find({_id : d}).fetch();
    let relatedcoll = collEthnic.find().fetch();
    let arr = []
    for(x in relatedcoll){
      let id = relatedcoll[x].refethnicid;
      let name = relatedcoll[x].refethnicname;
      let jobsrelatedid = '';
      let select='';
      for(y in b){
        jobsrelatedid = b[0].ethnicity;
      }
      if (id == jobsrelatedid) {
        select = "Selected";
      }
      arr[x] = {id:id, name:name, select:select}
    }
    return arr;
  },
  print_religion:function(){
    sub();
    let d = Session.get('id');
    let b = collJobs.find({_id : d}).fetch();
    let relatedcoll = collReligion.find().fetch();
    let arr = []
    for(x in relatedcoll){
      let id = relatedcoll[x].refreligionid;
      let name = relatedcoll[x].refreligionnameen;
      let jobsrelatedid = '';
      let select='';
      for(y in b){
        jobsrelatedid = b[0].religionid;
      }
      if (id == jobsrelatedid) {
        select = "Selected";
      }
      arr[x] = {id:id, name:name, select:select}
    }
    return arr;
  },
  print_marital:function(){
    sub();
    let d = Session.get('id');
    let b = collJobs.find({_id : d}).fetch();
    let relatedcoll = collMarital.find().fetch();
    let arr = []
    for(x in relatedcoll){
      let id = relatedcoll[x].refmaritalid;
      let name = relatedcoll[x].refmaritalnameen;
      let jobsrelatedid = '';
      let select='';
      for(y in b){
        jobsrelatedid = b[0].marital;
      }
      if (id == jobsrelatedid) {
        select = "Selected";
      }
      arr[x] = {id:id, name:name, select:select}
    }
    return arr;
  },
  print_state:function(){
    sub();
    let d = Session.get('id');
    let b = collJobs.find({_id : d}).fetch();
    let relatedcoll = collState.find().fetch();
    let arr = []
    for(x in relatedcoll){
      let id = relatedcoll[x].refstateid;
      let name = relatedcoll[x].refstatename;
      let jobsrelatedid = '';
      let select='';
      for(y in b){
        jobsrelatedid = b[0].stateid;
      }
      if (id == jobsrelatedid) {
        select = "Selected";
      }
      arr[x] = {id:id, name:name, select:select}
    }
    return arr;  
  },
  print_city:function(){
    sub();
    let d = Session.get('id');
    let b = collJobs.find({_id : d}).fetch();
    let relatedcoll = collCity.find().fetch();
    let arr = []
    for(x in relatedcoll){
      let id = relatedcoll[x].refcityid;
      let name = relatedcoll[x].refcityname;
      let jobsrelatedid = '';
      let select='';
      for(y in b){
        jobsrelatedid = b[0].cityid;
      }
      if (id == jobsrelatedid) {
        select = "Selected";
      }
      arr[x] = {id:id, name:name, select:select}
    }
    return arr;  
  },
  print_resstat:function(){
    sub();
    let d = Session.get('id');
    let b = collJobs.find({_id : d}).fetch();
    let relatedcoll = collResStat.find().fetch();
    let arr = []
    for(x in relatedcoll){
      let id = relatedcoll[x].refresidentstatusid;
      let name = relatedcoll[x].refresidentstatusnameen;
      let jobsrelatedid = '';
      let select='';
      for(y in b){
        jobsrelatedid = b[0].residentstatus;
      }
      if (id == jobsrelatedid) {
        select = "Selected";
      }
      arr[x] = {id:id, name:name, select:select}
    }
    return arr;  
  },
  print_allow_check:function(){
    sub();
    let d = Session.get('id');
    let b = collJobs.find({_id : d}).fetch();
    let arr = [];
    let condition = '';
    let check = ''
    for(x in b){
        condition = b[0].workinindo;
        if (condition == true) {
          check = "Checked";
          Session.set('check_allow', true);
        }else{
          Session.set('check_allow', false);
        }
      arr[x] = {check:check}
    }
    return arr;  
  },
  print_gender_check:function(){
    try{
      sub();
      let d = Session.get('id');
      let b = collJobs.find({_id : d}).fetch();
      let arr = [];
      let gender = ['Female', 'Male'];
      let genderid = [0, 1];
      let jobsgender = '';
      let jobsgenderid = '';

      for(x in gender){
        let check = '';
        jobsgender = gender[x];
        jobsgenderid = genderid[x];

        if (b[0].gender == x) {
          check = "Checked";
          Session.set('check_gender', jobsgenderid);
        }

        arr[x] = {val:jobsgenderid, gender:jobsgender, check:check}
      }
      return arr;
    }catch(ex){

    }
  },
  print_company:function(){
    try{
    	company();
      	return companies;
    }catch(e){
      console.log(e);
    }
  },
  print_education:function(){
    try{
     	education();
      	return educations;
    }catch(e){
      	console.log(e);
    } 
  },
});

Template.update.events({
  'click .back':function(e){
    e.preventDefault();
    let page = Session.get('page');
    Router.go('/page/'+page);
  },
  'submit .search_loc':function(e){
    e.preventDefault();
    Session.set('search_loc', '');
    let target = e.target;
    let text = target.text.value;
    Session.set('search_loc', text);
  },
  'click .delete':function(e){
    let id = Session.get('id');
    if (confirm("Delete id : " + id + "?") == true) {
      Meteor.call('collJobs.remove', id); 
      Router.go('/page/'+page);
    }
    alert('Deleted!');
  },
  'click .allow':function(e){
    let check = this.check;
    if (check == 'Checked') {
      Session.set('check_allow', false);
      this.check = '';
    }else{
      Session.set('check_allow', true);
      this.check = 'Checked';
    }
  },
  'click .gender':function(e){
    let id = this.val;
    Session.set('check_gender', id);
  },
  'submit .update':function(e){
    e.preventDefault();
    let id = Session.get('id');
    let firstnm = e.target.firstname.value;
    let lastnm = e.target.lastname.value;
    let mobile = e.target.mobileprim.value;
    let email = e.target.email.value;
    let address = e.target.address.value;
    let title = $('#title').val();
    let nation = $('#nation').val();
    let ethnic = $('#ethnic').val();
    let religion = $('#religion').val();
    let marital = $('#marital').val();
    let country = $('#country').val();
    let state = $('#state').val();
    let city = $('#city').val();
    let resstat = $('#resstat').val();
    let allow = Session.get('check_allow');
    let gender = Session.get('check_gender');
    let bop = e.target.bop.value;
    let education = [];
    let company = [];

    for(x in educations){
    	let edlevel = $('#'+x+'.edlevel').val();
    	let institute = $('#'+x+'.institute').val();
   		let faculty = $('#'+x+'.faculty').val();
    	let major = $('#'+x+'.major').val();
    	let location = $('#'+x+'.location').val();
    	let gpa = $('#'+x+'.gpa').val();
    	let outoff = $('#'+x+'.outoff').val();
    	let startyear = $('#'+x+'.startyear').val();
    	let endyear = $('#'+x+'.endyear').val();
    	education[x] = {
    		_id:x,
    		name:institute, 
    		major:major, 
    		faculty:faculty, 
    		gpaoutof:outoff, 
    		gpa:gpa, 
    		startyear:startyear, 
    		endyear:endyear, 
    		countrycitytext:location, 
    		typeid:edlevel};
    }

    for(x in companies){
    	let companyname = $('#'+x+'.companyname').val();
    	let companytype = $('#'+x+'.companytype').val();
   		let industry = $('#'+x+'.industry').val();
    	let citytext = $('#'+x+'.citytext').val();
    	let companyweb = $('#'+x+'.companyweb').val();
    	let reason = $('#'+x+'.reason').val();
    	let jobtitle = $('#'+x+'.jobtitle').val();
    	let jobcat = $('#'+x+'.jobcat').val();
    	let jobsub = $('#'+x+'.jobsub').val();
    	let joblevel = $('#'+x+'.joblevel').val();
    	let jobtype = $('#'+x+'.jobtype').val();
    	company[x] = {
    		id:x,
    		companyname:companyname, 
    		companytitle:companytype, 
    		industrytype:industry, 
    		citytext:citytext, 
    		companyweb:companyweb, 
    		terminationreason:reason,
    		_detail:[{
    			jobtitle:jobtitle,
    			categoryid:jobcat,
    			subcategoryid:jobsub,
    			joblevel:joblevel,
    			jobtype:jobtype
    		}]
    	};
    }

    console.log(company);
    console.log(education);
    
    // let getnowBod = e.target.borndatepicker.value;    
    // let bodString = Date.parse(getnowBod).toString();
    // let bodObj = JSON.parse('{"bodKey":'+ bodString +'}'),bod = new Date(bodObj.bodKey);
    // console.log(getnowBod);
    // console.log(bodString);
    // console.log(bod.toISOString());

    if (confirm('Save this data?') == true) {
      try{
        Meteor.call('collJobs.update', 
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
        company
      );
        alert('Succed!')
      }catch(ex){
        alert(ex);
      }
    }
  },
  'focus #borndatepicker': function () {
    let endyear = $('#'+id+'.endyear').val();
    borndatepicker.value = '';
    $('#borndatepicker').datetimepicker();
  },
  'focus .endyear': function () {
    let id = this.id;
    let endyear = $('#'+id+'.endyear').val();
    let date;

    if( endyear != 'None' ){
      date = "01/01/"+endyear+' 12:00';
    }else{
      date = "01/01/1990 12:00";
    }
    
    $('#'+id+'.endyear').val(date);
    $('#'+id+'.endyear').datetimepicker();
  },
  'focus .startyear': function () {
    let id = this.id;
    let startyear = $('#'+id+'.startyear').val();
    let date;

    if( startyear != 'None' ){
      date = "01/01/"+startyear+' 12:00';
    }else{
      date = "01/01/1990 12:00";
    }
    
    $('#'+id+'.startyear').val(date);
    $('#'+id+'.startyear').datetimepicker();
  },
  'click #print':function(){
  	let d = Session.get('id');
    Meteor.call('collJobs.add.education', d);
  },
  'click #print2':function(){
  	let d = Session.get('id');
  	Meteor.call('collJobs.add.exp', d);
  },
  'click .deleteed':function(){
  	let d = Session.get('id');
  	let id = this.id;
  	Meteor.call('collJobs.del.ed', d, id);
  },
});

// Template.search.helpers({
//   print_loc:function(){
//     try{
//       let a = '';
//       a = Session.get('search_loc');
//       Meteor.subscribe('subdist', a);
//       Meteor.subscribe('dist');
//       Meteor.subscribe('postcode');
//       Meteor.subscribe('state');
//       Meteor.subscribe('city');
//       let arr = [];
//       let subdistnm;
//       let distid;
//       let c;
//       let distnm;
//       let cityid;
//       let d;
//       let citynm;
//       let stateid;
//       let e;
//       let statenm;
//       let f;
//       let postcode;
//       let b = collSubDist.find().fetch();

//       for(x in b){
//         subdistnm = b[x].refsubdistrictname;
//         distid = b[x].refsubdistrictdistrictid;
//         c = collDist.find({refdistrictid: distid }).fetch();
//         distnm = c[0].refdistrictname;
//         cityid = c[0].refdistrictcityid;
//         d = collCity.find({refcityid: cityid }).fetch();
//         citynm = d[0].refcityname;
//         stateid = d[0].refcitystateid;
//         e = collState.find({refstateid: stateid }).fetch();
//         statenm = e[0].refstatename;
//         f = collPostCode.find({refpostcodedistrictid: distid }).fetch();
//         postcode = f[0].refpostcodecode;
//         arr[x] = {subdist:subdistnm, dist:distnm, city:citynm, state:statenm, postcode:postcode};
//       };
//       return arr;  
//     }catch(e){
      
//     }
    
//   }
// });

// Template.search.events({
//   'submit .search_loc':function(e){
//     e.preventDefault();
//     Session.set('search_loc', '');
//     let target = e.target;
//     let text = target.text.value;
//     Session.set('search_loc', text);
//     alert(text);
//   },
//   'click .row':function(e) {
//     e.preventDefault();
//     let row = this.postcode;
//     alert(row);
//   },
// });
