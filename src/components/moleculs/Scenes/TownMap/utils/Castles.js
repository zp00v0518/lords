const Castles = {
	backScene: new Canvas("castle"),
	listDrawBuilding:[],
	hoverNow:null,
	race:{
		rampart: {
			listbuildngs:["market","storage2", "storage2", "storage3","storage4", "mag1", "mag2", "mag3"],
			src:"img/castle/rampart",
			buildings:{
				drag2:{
					is:true,
					prepare:false,
					if:[],
					price:{
						gold: 1000,
						wood: 5,
						ore: 5,
					},
					imgInfo:{
						name:"rdr2aa.gif",
						coords:{
							x:380,
							y:45,
						},
					},
				},
				peg2:{
					is:true,
					prepare:false,
					if:[],
					price:{
						gold: 1000,
						wood: 5,
						ore: 5,
					},
					imgInfo:{
						name:"rpeg2a.gif",
						coords:{
							x:270,
							y:85,
						},
					},
				},
				fort3:{
					is:true,
					prepare:false,
					if:[],
					price:{
						gold: 1000,
						wood: 5,
						ore: 5,
					},
					imgInfo:{
						name:"rfort3.gif",
						coords:{
							x:75,
							y:65,
						},
					},
				},				
				hal4:{
					is:true,
					prepare:false,
					if:[],
					price:{
						gold: 1000,
						wood: 5,
						ore: 5,
					},
					imgInfo:{
						name:"rhal4.gif",
						coords:{
							x:400,
							y:300,
						},
					},
				},
			},
			imgCoords:{
				other1:{
					x:250,
					y:370,
				},
				other2:{
					x:250,
					y:370,
				},
				market:{
					x:80,
					y:430,
				},
				storage1:{
					zIndex:1,
					x:200,
					y:450,
				},
				storage2:{
					x:200,
					y:450,
				},
				storage3:{
					x:0,
					y:0,
				},
				storage4:{
					x:0,
					y:0,
				},
				mag1:{
					x:340,
					y:300,
				},
				mag2:{
					x:250,
					y:170,
				},
				mag3:{
					x:250,
					y:170,
				},
				mag4:{
					x:250,
					y:170,
				},
				mag5:{
					x:230,
					y:190,
				},
				fort1:{
					x:50,
					y:80,
				}
			},
		},
	},
};

