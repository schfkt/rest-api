package authorization

import input
import data.users
import data.features

default allow = false

allow = true {
  user = users[input.user]
  user != null

  feature = features[input.feature]
  feature != null

  user.hasAccessToFeatures[_] == input.feature
}
