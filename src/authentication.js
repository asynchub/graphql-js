const HEADER_REGEX = /bearer token-(.*)$/;

module.exports.authenticate = async ({ headers: { authorization } }, Users) => {
  const email = authorization && HEADER_REGEX.exec(authorization)[1];
  return email && await Users.findOne({ email });
}

/*

{
  allLinks {
    url
    postedBy {
      name
    }
  }
}

mutation {
  signinUser(
    email: {
      email: "user2@test.com",
      password: "password"
    }
  ) {
    token
    user {
      id
    }
  }
}


mutation {
  createLink(
    url: "http://jwt.io",
    description: "nice auth Y"
  ) {
    id
    postedBy {
      name
    }
  }
}

mutation {
  createVote(linkId: "5a2ecd563f976628c7965b66") {
    id
    user {
      name
      email
      id
    }
    link {
      url
      description
      postedBy {
        id
        name
      }
    }
  }
}

*/
