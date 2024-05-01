## User

---

### User

| name         | type   | unique | optional |
| ------------ | ------ | ------ | -------- |
| id           | int    | yes    | no       |
| username     | string | yes    | no       |
| full_name    | string | no     | no       |
| email        | string | yes    | no       |
| linkedin_url | string | no     | no       |
| password     | string | no     | no       |


## Application

---

### ApplicationOut

| name         | type     | unique | optional |
| ------------ | -------- | ------ | -------- |
| id           | int      | yes    | no       |
| job_id       | int      | no     | no       |
| applicant_id | int      | no     | no       |
| applied_at   | datetime | no     | no       |

### ApplicationList

| name         | type                    | unique | optional |
| ------------ | ----------------------- | ------ | -------- |
| applications | List[ApplicationOut]    | no     | no       |


## Job

---

### JobIn

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| image_url        | string | no     | no       |
| position_title   | string | no     | no       |
| company_name     | string | no     | no       |
| location         | string | no     | no       |
| job_description | string | no     | no       |

### JobOut

| name             | type     | unique | optional |
| ---------------- | -------- | ------ | -------- |
| id               | int      | yes    | no       |
| image_url        | string   | no     | no       |
| position_title   | string   | no     | no       |
| company_name     | string   | no     | no       |
| location         | string   | no     | no       |
| job_description | string   | no     | no       |
| posted_date      | datetime | no     | no       |
| creator_id       | int      | no     | no       |

### JobList

| name | type          | unique | optional |
| ---- | ------------- | ------ | -------- |
| jobs | List[JobOut] | no     | no       |


## JWT Payload

---

### JWTUserData

| name         | type   | unique | optional |
| ------------ | ------ | ------ | -------- |
| id           | int    | yes    | no       |
| username     | string | yes    | no       |
| full_name    | string | no     | no       |
| email        | string | yes    | no       |
| linkedin_url | string | no     | no       |

### JWTPayload

| name | type       | unique | optional |
| ---- | ---------- | ------ | -------- |
| user | JWTUserData | no     | no       |
| sub  | string     | no     | no       |
| exp  | int        | no     | no       |
