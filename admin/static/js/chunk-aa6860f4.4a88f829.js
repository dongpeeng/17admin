(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aa6860f4"],{"96ca":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",[a("span",{staticStyle:{"font-size":"22px"}},[e._v(e._s(e.name))]),e._v(" "),a("div",[a("span",{staticStyle:{position:"relative"}},[a("el-tag",{staticStyle:{"font-size":"15px",position:"absolute","margin-top":"10px","margin-left":"10px"}},[e._v("单选题")]),e._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"87%","margin-bottom":"10px","margin-top":"10px"},attrs:{round:"",size:"small",icon:"el-icon-plus"},on:{click:function(t){return e.handleAdd(0)}}},[e._v("添加")])],1),e._v(" "),a("el-table",{attrs:{data:e.singleList,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"题目",align:"center",prop:"title"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.title))])]}}])}),e._v(" "),a("el-table-column",{attrs:{"class-name":"status-col",label:"编辑",width:"220",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.handleEdit(0,t.row)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(a){return e.handleDel(t.row)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("div",[a("span",[a("el-tag",{staticStyle:{"font-size":"15px",position:"absolute","margin-top":"10px","margin-left":"10px"}},[e._v("多选题")]),e._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"87%","margin-bottom":"10px","margin-top":"10px"},attrs:{round:"",size:"small",icon:"el-icon-plus"},on:{click:function(t){return e.handleAdd(1)}}},[e._v("添加")])],1),e._v(" "),a("el-table",{attrs:{data:e.multipleList,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"题目",align:"center",prop:"title"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.title))])]}}])}),e._v(" "),a("el-table-column",{attrs:{"class-name":"status-col",label:"编辑",width:"220",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.handleEdit(1,t.row,t.$index)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(a){return e.handleDel(t.row)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("router-link",{attrs:{to:"/chapter/chapterList"}},[a("el-button",{staticStyle:{width:"10%","margin-top":"20px","margin-left":"45%"},attrs:{type:"primary",round:""}},[e._v("确定")])],1),e._v(" "),a("el-dialog",{attrs:{title:"创建",visible:e.addFormMultipleVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addFormMultipleVisible=t}}},[a("el-form",{ref:"addForm",staticStyle:{width:"80%","margin-left":"50px"},attrs:{model:e.addForm,"label-position":"left","label-width":"20%"}},[a("el-form-item",{attrs:{label:"题目",prop:"title"}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.addForm.title,callback:function(t){e.$set(e.addForm,"title",t)},expression:"addForm.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"A"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceA,callback:function(t){e.$set(e.addForm,"choiceA",t)},expression:"addForm.choiceA"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"B"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceB,callback:function(t){e.$set(e.addForm,"choiceB",t)},expression:"addForm.choiceB"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"C"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceC,callback:function(t){e.$set(e.addForm,"choiceC",t)},expression:"addForm.choiceC"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"D"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceD,callback:function(t){e.$set(e.addForm,"choiceD",t)},expression:"addForm.choiceD"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答案"}},[a("el-checkbox-group",{model:{value:e.checkListFrom,callback:function(t){e.checkListFrom=t},expression:"checkListFrom"}},[a("el-checkbox",{attrs:{label:"A"}}),e._v(" "),a("el-checkbox",{attrs:{label:"B"}}),e._v(" "),a("el-checkbox",{attrs:{label:"C"}}),e._v(" "),a("el-checkbox",{attrs:{label:"D"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"答案解析"}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.addForm.answerDesc,callback:function(t){e.$set(e.addForm,"answerDesc",t)},expression:"addForm.answerDesc"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{nativeOn:{click:function(t){e.addFormMultipleVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addLoading},nativeOn:{click:function(t){return e.addSubmit(t)}}},[e._v("提 交")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"创建",visible:e.addFormSingleVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addFormSingleVisible=t}}},[a("el-form",{ref:"addForm",staticStyle:{width:"80%","margin-left":"50px"},attrs:{model:e.addForm,"label-position":"left","label-width":"20%"}},[a("el-form-item",{attrs:{label:"题目",prop:"title"}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.addForm.title,callback:function(t){e.$set(e.addForm,"title",t)},expression:"addForm.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"A"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceA,callback:function(t){e.$set(e.addForm,"choiceA",t)},expression:"addForm.choiceA"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"B"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceB,callback:function(t){e.$set(e.addForm,"choiceB",t)},expression:"addForm.choiceB"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"C"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceC,callback:function(t){e.$set(e.addForm,"choiceC",t)},expression:"addForm.choiceC"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"D"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceD,callback:function(t){e.$set(e.addForm,"choiceD",t)},expression:"addForm.choiceD"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答案"}},[a("el-radio-group",{model:{value:e.addForm.answer,callback:function(t){e.$set(e.addForm,"answer",t)},expression:"addForm.answer"}},[a("el-radio",{attrs:{label:"A"}},[e._v("A")]),e._v(" "),a("el-radio",{attrs:{label:"B"}},[e._v("B")]),e._v(" "),a("el-radio",{attrs:{label:"C"}},[e._v("C")]),e._v(" "),a("el-radio",{attrs:{label:"D"}},[e._v("D")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"答案解析"}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.addForm.answerDesc,callback:function(t){e.$set(e.addForm,"answerDesc",t)},expression:"addForm.answerDesc"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{nativeOn:{click:function(t){e.addFormSingleVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addLoading},nativeOn:{click:function(t){return e.addSubmit(t)}}},[e._v("提 交")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editFormMultipleVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.editFormMultipleVisible=t}}},[a("el-form",{ref:"editForm",staticStyle:{width:"80%","margin-left":"50px"},attrs:{model:e.addForm,"label-position":"left","label-width":"20%"}},[a("el-form-item",{attrs:{label:"题目",prop:"title"}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.addForm.title,callback:function(t){e.$set(e.addForm,"title",t)},expression:"addForm.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"A"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceA,callback:function(t){e.$set(e.addForm,"choiceA",t)},expression:"addForm.choiceA"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"B"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceB,callback:function(t){e.$set(e.addForm,"choiceB",t)},expression:"addForm.choiceB"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"C"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceC,callback:function(t){e.$set(e.addForm,"choiceC",t)},expression:"addForm.choiceC"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"D"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceD,callback:function(t){e.$set(e.addForm,"choiceD",t)},expression:"addForm.choiceD"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答案"}},[a("el-checkbox-group",{model:{value:e.checkListFrom,callback:function(t){e.checkListFrom=t},expression:"checkListFrom"}},[a("el-checkbox",{attrs:{label:"A"}}),e._v(" "),a("el-checkbox",{attrs:{label:"B"}}),e._v(" "),a("el-checkbox",{attrs:{label:"C"}}),e._v(" "),a("el-checkbox",{attrs:{label:"D"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"答案解析"}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.addForm.answerDesc,callback:function(t){e.$set(e.addForm,"answerDesc",t)},expression:"addForm.answerDesc"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{nativeOn:{click:function(t){e.editFormMultipleVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editLoading},nativeOn:{click:function(t){return e.editSubmit(t)}}},[e._v("提 交")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editFormSingleVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.editFormSingleVisible=t}}},[a("el-form",{ref:"editForm",staticStyle:{width:"80%","margin-left":"50px"},attrs:{model:e.addForm,"label-position":"left","label-width":"20%"}},[a("el-form-item",{attrs:{label:"题目",prop:"title"}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.addForm.title,callback:function(t){e.$set(e.addForm,"title",t)},expression:"addForm.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"A"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceA,callback:function(t){e.$set(e.addForm,"choiceA",t)},expression:"addForm.choiceA"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"B"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceB,callback:function(t){e.$set(e.addForm,"choiceB",t)},expression:"addForm.choiceB"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"C"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceC,callback:function(t){e.$set(e.addForm,"choiceC",t)},expression:"addForm.choiceC"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"D"}},[a("el-input",{attrs:{type:"textarea",rows:1},model:{value:e.addForm.choiceD,callback:function(t){e.$set(e.addForm,"choiceD",t)},expression:"addForm.choiceD"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答案"}},[a("el-radio-group",{model:{value:e.addForm.answer,callback:function(t){e.$set(e.addForm,"answer",t)},expression:"addForm.answer"}},[a("el-radio",{attrs:{label:"A"}},[e._v("A")]),e._v(" "),a("el-radio",{attrs:{label:"B"}},[e._v("B")]),e._v(" "),a("el-radio",{attrs:{label:"C"}},[e._v("C")]),e._v(" "),a("el-radio",{attrs:{label:"D"}},[e._v("D")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"答案解析"}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.addForm.answerDesc,callback:function(t){e.$set(e.addForm,"answerDesc",t)},expression:"addForm.answerDesc"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{nativeOn:{click:function(t){e.editFormSingleVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editLoading},nativeOn:{click:function(t){return e.editSubmit(t)}}},[e._v("提 交")])],1)],1)],1)])},o=[];a("7bc1"),a("7364"),a("b775");var r=a("b736"),l={data:function(){return{checkList:[],checkListFrom:[],singleList:[],multipleList:[],addForm:{title:"",choiceA:"",choiceB:"",choiceC:"",choiceD:"",answer:"",answerDesc:""},addFormSingleVisible:!1,addFormMultipleVisible:!1,addLoading:!1,editFormSingleVisible:!1,editFormMultipleVisible:!1,editLoading:!1,name:this.$route.params.name,secId:this.$route.params.secId,status:-1,listLoading:!0,id:-1}},created:function(){this.getData()},methods:{getData:function(){var e=this;this.listLoading=!0,Object(r["d"])({secId:this.secId}).then(function(t){if(e.listLoading=!1,1*t.errno===101)for(var a in e.singleList=t.data.sing,e.multipleList=t.data.mul,e.multipleList)e.checkList[a]=e.multipleList[a].answer.split("|");else e.$message.error(t.errmsg)})},resetdata:function(){for(var e in this.addForm)this.addForm[e]="";this.checkListFrom=[]},handleAdd:function(e){1*e===1?(this.addFormMultipleVisible=!0,this.status=1):(this.addFormSingleVisible=!0,this.status=0),this.resetdata()},addSubmit:function(){var e=this;1*this.status===1&&(this.addForm.answer=this.checkListFrom.join("|")),this.$confirm("确认提交吗？","提示",{}).then(function(){Object(r["a"])({secId:e.secId,title:e.addForm.title,choiceA:e.addForm.choiceA,choiceB:e.addForm.choiceB,choiceC:e.addForm.choiceC,choiceD:e.addForm.choiceD,answer:e.addForm.answer,answerDesc:e.addForm.answerDesc,status:e.status}).then(function(t){1*t.errno===101?(1*e.status===1?e.addFormMultipleVisible=!1:e.addFormSingleVisible=!1,e.$message({message:"添加成功！",type:"success"}),e.getData()):e.$message.error(t.errmsg)})})},handleDel:function(e){var t=this;this.$confirm("确认删除吗?","提示",{type:"warning"}).then(function(){Object(r["b"])({exerciseId:e.id}).then(function(e){1*e.errno===101?(t.$message({message:"删除成功",type:"success"}),t.getData()):t.$message.error(e.errmsg)})})},handleEdit:function(e,t,a){this.status=e,this.id=t.id,this.addForm=Object.assign({},t),1*e===1?(this.editFormMultipleVisible=!0,this.checkListFrom=this.checkList[a]):this.editFormSingleVisible=!0},editSubmit:function(){var e=this;1*this.status===1&&(this.addForm.answer=this.checkListFrom.join("|")),this.$confirm("确认提交吗？","提示",{}).then(function(){Object(r["e"])({id:e.id,secId:e.secId,status:e.status,title:e.addForm.title,choiceA:e.addForm.choiceA,choiceB:e.addForm.choiceB,choiceC:e.addForm.choiceC,choiceD:e.addForm.choiceD,answer:e.addForm.answer,answerDesc:e.addForm.answerDesc}).then(function(t){1*t.errno===101?(e.$message({message:"修改成功",type:"success"}),1*e.status===1?e.editFormMultipleVisible=!1:e.editFormSingleVisible=!1,e.getData()):e.$message.error(t.errmsg)})})}}},s=l,c=a("6691"),n=Object(c["a"])(s,i,o,!1,null,"35745cd2",null);t["default"]=n.exports},b736:function(e,t,a){"use strict";a.d(t,"b",function(){return o}),a.d(t,"e",function(){return r}),a.d(t,"c",function(){return l}),a.d(t,"a",function(){return s}),a.d(t,"d",function(){return c});var i=a("b775");function o(e){return Object(i["a"])({url:BASE_API+"exercise/delete",method:"post",data:e})}function r(e){return Object(i["a"])({url:BASE_API+"exercise/update",method:"post",data:e})}function l(e){return Object(i["a"])({url:BASE_API+"exercise/getAllExerciseByPathId",method:"post",data:e})}function s(e){return Object(i["a"])({url:BASE_API+"exercise/add",method:"post",data:e})}function c(e){return Object(i["a"])({url:BASE_API+"exercise/getAllExerciseBySecId",method:"post",data:e})}}}]);