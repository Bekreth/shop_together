import { JoinedMapKeys, missing_map_keys, reduce_joined_map_keys } from "utils/missing_map_keys";

test("Map keys don't overlap", () => {
  const input1: JoinedMapKeys = {
    keys1: {"hello": {}},
    joint_keys: {},
    keys2: {},
  }

  const input2: JoinedMapKeys = {
    keys1: {},
    joint_keys: {},
    keys2: {"world": {}},
  }

  const expected_output: JoinedMapKeys = {
    keys1: {"hello": {}},
    joint_keys: {},
    keys2: {"world": {}},
  }

  const actual_output = reduce_joined_map_keys(input1, input2)
  expect(actual_output).toStrictEqual(expected_output)
})

test('Build a missing key map', () => {

  const input1 = {
    "hello": {},
    "world": {},
    "billy": {},
    "goat": {},
  }
  
  const input2 = {
    "goodnight": {},
    "world": {},
    "randy": {},
    "goat": {},
  }

  const expected_join: JoinedMapKeys = {
    keys1: { 
      "hello":{}, 
      "billy":{},
    },
    joint_keys: { 
      "world": {}, 
      "goat":{},
    },
    keys2: { 
      "goodnight": {}, 
      "randy":{},
    },
  }

  const actual_join = missing_map_keys(input1, input2)
  expect(actual_join).toStrictEqual(expected_join)
})