export default async function* <T>(
  source: AsyncIterable<T> | Iterable<T>,
  predicate: (value: T, index: number) => Promise<boolean> | boolean
): AsyncIterable<T> {
  const It = source[Symbol.asyncIterator] || source[Symbol.iterator];
  if (typeof It !== "function")
    throw Error("source parameter is not iterable");
  let index = 0;
  let it: AsyncIterator<T> = It.call(source);
  while (true) {
    const { done, value } = await it.next();
    if (done) {
      return;
    }
    if (predicate(value, index++)) {
      yield value;
    }
  }
}