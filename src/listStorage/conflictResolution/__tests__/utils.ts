import { StorageMetadata } from "listData"
import { ResolverFunction } from "listStorage/conflictResolution"

test.skip("skip", () => ({}))

export function validateOrderless<T extends StorageMetadata>(
	resolver: ResolverFunction<T>, 
	list1: T, 
	list2: T, 
	expectedList: T,
) {
	const leftReduce = resolver(list1, list2)
	expect(leftReduce).toBe(expectedList)
	const rightReduce = resolver(list2, list1)
	expect(rightReduce).toBe(expectedList)
}
