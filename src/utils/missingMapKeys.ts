type LeftRight = {
  left: string[],
  right: string[]
}

function left(input: string): LeftRight {
	return {
		left: [input],
		right: []
	}
}

function right(input: string): LeftRight {
	return {
		left: [],
		right: [input]
	}
}

function reduce_left_right(previous: LeftRight, current: LeftRight): LeftRight {
	return {
		left: [...previous.left, ...current.left],
		right: [...previous.right, ...current.right],
	}
}


export type JoinedMapKeys = {
	keys1: {[key: string]: unknown},
	joint_keys: {[key: string]: unknown},
	keys2: {[key: string]: unknown},
}

export function reduce_joined_map_keys(
	previous: JoinedMapKeys, 
	current: JoinedMapKeys,
): JoinedMapKeys {
	const keys1: {[key: string]: unknown} = {
		...previous.keys1,
		...current.keys1,
	}
	const center: {[key: string]: unknown} = {
		...previous.joint_keys,
		...current.joint_keys,
	}
	const keys2: {[key: string]: unknown} = {
		...previous.keys2,
		...current.keys2,
	}
	const left_center: LeftRight = Object.keys(keys1)
		.map(key => {
			if (keys2[key] === undefined) {
				return left(key)
			} else {
				return right(key)
			}
		})
		.reduce(reduce_left_right, {left: [], right: []})

	left_center.right.forEach(key => {
		delete keys1[key]
		delete keys2[key]
		center[key] = {}
	})

	const center_right: LeftRight = Object.keys(keys2)
		.map(key => {
			if (keys1[key] === undefined) {
				return right(key)
			} else {
				return left(key)
			}
		})
		.reduce(reduce_left_right, {left: [], right: []})

	center_right.left.forEach(key => {
		delete keys1[key]
		delete keys2[key]
		center[key] = {}
	})
  
	return {
		keys1: keys1,
		joint_keys: center,
		keys2: keys2,
	}
}

export function missing_map_keys(
	map1: {[key: string]: unknown},
	map2: {[key: string]: unknown},
) : JoinedMapKeys {
	const joint_keys_1: JoinedMapKeys[] = Object.keys(map1)
		.map(key => {
			return {
				keys1: {[ key ]: {}},
				joint_keys: {},
				keys2: {},
			}
		})
	const joint_keys_2: JoinedMapKeys[] = Object.keys(map2)
		.map(key => {
			return {
				keys1: {},
				joint_keys: {},
				keys2: {[ key ]: {}},
			}
		})

	return joint_keys_1.concat(joint_keys_2)
		.reduce(reduce_joined_map_keys)
}
