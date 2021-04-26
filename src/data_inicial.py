data = {
    "Organization": [
        {
            "address": "Calle de Camarena XX",
            "email": "ready2helpemail@gmail.com",
            "id": 1,
            "name": "Ready2Help Co",
            "phone": "999999999",
            "zipcode": "28047"
        }
    ],
    "User": [
        {
            "email": "ready2helpemail@gmail.com",
            "id": 1,
            "organization_id": 1,
            "password": "sha256$mWTKixVn$eff48ebddcbfe4938d070f2eeff41109a2610180f121d222f0601114c65bfd29",
            # "roles": [
            #     "member",
            #     "organization"
            # ],
            "token": ""
        }
    ],
    "Role": [
        {
            "id": 1,
            "name": "admin"
        },
        {
            "id": 2,
            "name": "member"
        },
        {
            "id": 3,
            "name": "organization"
        }
    ],
    "UserRoles": [
        {
            "user_id": 1,
            "role_id": 2
        },
        {
            "user_id": 1,
            "role_id": 3
        }
    ],
    
    "Project": [
        {
            "description": "Proyecto 1",
            "money_needed": 70000,
            "organization_id": 1,
            "people_needed": 2,
            "status": "draft",
            "subtitle": "Proyecto 1",
            "title": "Proyecto 1",
            "total_donated":0
        },
        {
            "description": "Proyecto 2",
            "money_needed": 60000,
            "organization_id": 1,
            "people_needed": 60,
            "status": "draft",
            "subtitle": "Proyecto 2",
            "title": "Proyecto 2",
            "total_donated":0
        },
        {
            "description": "Proyecto 3",
            "money_needed": 50000,
            "organization_id": 1,
            "people_needed": 50,
            "status": "draft",
            "subtitle": "Proyecto 3",
            "title": "Proyecto 3",
            "total_donated":0
        },
        {
            "description": "Proyecto 4",
            "money_needed": 20000,
            "organization_id": 1,
            "people_needed": 20,
            "status": "draft",
            "subtitle": "Proyecto 4",
            "title": "Proyecto 4",
            "total_donated":0
        }
    ]
}
