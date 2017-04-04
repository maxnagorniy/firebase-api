/*


{
    "rules": {
        "users": {
            "$uid": {
            ".read": "auth != null",
                ".write": "auth != null",
                ".validate": "nawData.hasChildren(['name', 'avatar'])",
                    "name":{
                ".validate": "newData.val().length > 0"
                },
                    "avatar":{
                        ".validate": "newData.val().length > 0"
                }
           }
        }
    }
}
*/
