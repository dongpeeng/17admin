(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44bb8ce9"],{"44bb":function(t,e,a){"use strict";var n=a("968e"),o=a.n(n);o.a},5807:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"course-list"}},[a("el-button",{attrs:{type:"primary",id:"course-list-add"},on:{click:function(e){return t.addChapter()}}},[a("i",{staticClass:"el-icon-plus"}),t._v("\n    添加章\n  ")]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{fixed:"",prop:"chapId",label:"ID",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"名称"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"350"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.goDetails(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.del(e.row)}}},[t._v("删除")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.goSection(e.row)}}},[t._v("编辑节")])]}}])})],1)],1)},o=[],s=a("b775");function r(t){return Object(s["a"])({url:BASE_API+"course/getChap",method:"get",params:t})}function i(t){return Object(s["a"])({url:BASE_API+"course/delChapById",method:"post",params:t})}var c={data:function(){return{listLoading:!0,courseId:this.$route.params.courseId,tableData:[]}},computed:{},methods:{addChapter:function(){this.$router.push("/course/chapter/details/".concat(this.courseId,"/-1"))},goDetails:function(t){this.$router.push("/course/chapter/details/".concat(this.courseId,"/").concat(t.chapId))},del:function(t){var e=this;console.log(t),this.listLoading=!0,i({chapId:t.chapId}).then(function(t){e.listLoading=!1,1*t.errno===101?(e.$message({message:"删除成功",type:"success"}),e.getData()):e.$message.error(t.errmsg)})},getData:function(t){var e=this;this.listLoading=!0;var a={courseId:this.courseId};r(a).then(function(t){console.log(t),e.listLoading=!1,e.tableData=t.data})},goSection:function(t){this.$router.push("/course/section/".concat(t.chapId))}},created:function(){this.getData()}},l=c,u=(a("44bb"),a("6691")),d=Object(u["a"])(l,n,o,!1,null,"a32c9ef2",null);e["default"]=d.exports},"968e":function(t,e,a){}}]);