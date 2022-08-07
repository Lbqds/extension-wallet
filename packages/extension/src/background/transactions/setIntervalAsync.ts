// behaves like native setInterval but waits for promise to resolve before calling next iteration
export function setIntervalAsync(fn: () => Promise<unknown>, delay: number) {
  let handle: NodeJS.Timeout | undefined
  const loop = async () => {
    try {
      await fn()
    } catch {
      // ignore
    }
    handle = setTimeout(loop, delay)
  }
  handle = setTimeout(loop, delay)
  return () => {
    if (handle) {
      clearTimeout(handle)
    }
  }
}
