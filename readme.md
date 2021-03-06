comic-express
===

##### Master

[![Build Status](https://travis-ci.org/vivalalova/comic-express.svg?branch=master)](https://travis-ci.org/vivalalova/comic-express/)

##### Develop
[![Build Status](https://travis-ci.org/vivalalova/comic-express.svg?branch=develop)](https://travis-ci.org/vivalalova/comic-express/)


### Usage

* git clone
* cp ./config/env.sample.js ./config/env.js
	* set env param in ./config/env.js
* cp ./config/session.sample.js ./config/session.js
	* set session secret

* create seed user with admin permission
	* modify `user id` and `passwd` first
```
node seed.js
```


* launch with `node ./bin/www` or else



### API

#### category

path `/category/`

#### catalog

path `/catalog/`

* `category title`
	* from response of api `category` ex : `冒险类`
* `title` for search comic-express
* `sort` optional,could be set to following
	* `hot` , sort for hot catalog
	* `update` , sort for recent updated
* `limit` default to 30
* `skip` (offset) default to 0 


* http method `POST` to send multiple catalog as array
	* auto create or update
	* bad in error handing

#### chapter

path `/catalog/{catalog_id}/chapter`

* `catalog_id` 
* limit = 2000

path `/catalog/{catalog_id}/chapter/{chapter_id}`

* return a chapter with id
* included next chapter information in chapter.next
* included prev chapter information in chapter.prev


#### page

path `/catalog/{catalog_id}/chapter/{chapter_id}/page`

* catalog_id
* chapter_id
* limit = 1000

