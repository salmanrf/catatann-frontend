export async function promiseTuplify<T>(
  promise: Promise<T>
): Promise<[T, Error | null]> {
  try {
    const res = await promise;

    return [res, null];
  } catch (error) {
    return [null as T, error as Error];
  }
}
