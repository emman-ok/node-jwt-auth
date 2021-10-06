
export const AppMenus = {
    
	navbarTopRightItems: [],
	navbarTopLeftItems: [],
	navbarSideLeftItems: [
  {
    "path": "/home",
    "label": "Dashboard",
    "icon": "dashboard",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/gallery",
    "label": "Gallery",
    "icon": "image",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/events",
    "label": "Events",
    "icon": "event",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/users",
    "label": "Users",
    "icon": "supervisor_account",
    "iconcolor": "",
    "target": "",
    "submenu": []
  }
],
	UsersTableHeaderItems: [],
	user_nameItems: [    

    ],
	EventsTableHeaderItems: [
  {
    "label": "Action",
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	colorItems: [    
{value: "red", label: "red"},
	{value: "blue", label: "blue"},
	{value: "green", label: "green"},
	{value: "orange", label: "orange"},
	{value: "black", label: "black"}
    ],
	iconItems: [    
{value: "image", label: "image"},
	{value: "cake", label: "cake"},
	{value: "event", label: "event"},
	{value: "account_box", label: "account_box"}
    ],

    exportFormats: {
        print: {
			label: 'Print',
			color: 'blue',
            icon: 'print',
            id: 'print',
            ext: '',
        },
        pdf: {
			label: 'Pdf',
			color: 'red',
            icon: 'picture_as_pdf',
            id: 'pdf',
            ext: 'pdf',
        },
        excel: {
			label: 'Excel',
			color: 'green',
            icon: 'grid_on',
            id: 'excel',
            ext: 'xlsx',
        },
        csv: {
			label: 'Csv',
			color: 'teal',
            icon: 'grid_on',
            id: 'csv',
            ext: 'csv',
        },
    },
    
}