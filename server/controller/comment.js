const graph = require('../../graphology/lib/index')
global.graphDataPath = __dirname
const comment = {}

function updateComment(id,comment){
	graph.load()
	var task = graph.read(id)
	if(task.data.comments == undefined)
		task.data.comments = ""
	task.data.comments = task.data.comments + comment
	graph.update(task)
	graph.save()
}

function getComment(id){
	graph.load()
	var task = graph.read(id)
	var comment = task.data.comments
	// console.log(comment)
	return comment
}

comment.handlePut = function(req,res,next){
	try {
	   var id = req.body.id
	   var comment = req.body.data.comments.trim()
	   // console.log(id,comment)
	   updateComment(id,comment)
	   res.status(200).json({
	   	message: "Comment added"
	   })
	} catch(err) {
		next(err)
	}
}

comment.handleGet = function(req,res,next){
	try {
	   var id = req.params.id
	   // console.log(id)
	   let list = getComment(id)
	   res.send(list)
	} catch(err) {
	   res.status(500).json({
	   	message: "ERROR"
	   }) 
	}
}

export default comment