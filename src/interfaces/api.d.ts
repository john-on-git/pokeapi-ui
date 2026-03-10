export type AsyncResourceStatus = "pending" | "error" | "success";

export type AsyncFetchingHookResult<T> =
    | { data: T | null, status: AsyncResourceStatus }
    // constrain the type to get us some more info once we've checked the status
    & ({ data: never, status: AsyncResourceStatus & ("pending" | "error") }
        | { data: T, status: AsyncResourceStatus & "success" });