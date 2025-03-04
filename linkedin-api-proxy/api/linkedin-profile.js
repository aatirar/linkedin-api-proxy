{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "name": "TARGET_NAME_HERE"
          }
        }
      ],
      "filter": [
        {
          "term": {
            "deleted": 0
          }
        }
      ]
    }
  },
  "_source": [
    "name",
    "title",
    "user_generated_headline", 
    "industry",
    "summary",
    "member_experience_collection"
  ],
  "size": 5
}