import { browser } from "$app/environment";

class HashManager {
  constructor(
    public hash: string = "",
    public autoUpdateWindowHash: boolean = true
  ) {}

  public static fromWindow(): HashManager {
    return new HashManager(browser ? window.location.hash.slice(1) : "");
  }

  public updateWindowHash(): string {
    if (!browser) {
      return this.hash;
    }

    window.location.hash = this.hash === "" ? "" : `#${this.hash}`;
    return this.hash;
  }

  public get(key: string): string | null {
    const hashes = this.getAllHashes();
    return hashes[key] ?? null;
  }

  public set(key: string, value: string): string {
    const hashString = this.getHashString(key, value);

    if (this.contains(key)) {
      this.hash = this.hash.replace(
        new RegExp(`${encodeURIComponent(key)}=.+?,`),
        `${hashString},`
      );
    } else {
      if (this.hash !== "") {
        this.hash += ",";
      }
      this.hash += `${hashString}`;
    }

    this.removeLeadingAndTrailingCommas();

    if (this.autoUpdateWindowHash) {
      this.updateWindowHash();
    }

    return this.hash;
  }

  public delete(key: string): null | string {
    if (!this.contains(key)) {
      return null;
    }

    const value = this.get(key);
    this.hash = this.hash
      .replace(
        new RegExp(
          `(${encodeURIComponent(key)}=.+?,)|(${encodeURIComponent(key)}=.+?$)`
        ),
        ","
      )
      .replace(/,+/, ",");

    this.removeLeadingAndTrailingCommas();

    if (this.autoUpdateWindowHash) {
      this.updateWindowHash();
    }

    return value;
  }

  public contains(key: string): boolean {
    return new RegExp(
      `(${encodeURIComponent(key)}=.+?,)|(${encodeURIComponent(key)}=.+?$)`
    ).test(this.hash);
  }

  public getAllHashes(): Record<string, string> {
    const unparsedHashes = this.hash.split(",");
    const parsedHashes: Record<string, string> = {};

    for (const hash of unparsedHashes) {
      if (hash === "") {
        continue;
      }

      const splitHash = hash.split("=");
      const key = decodeURIComponent(splitHash[0]);
      const value = decodeURIComponent(splitHash[1]);
      parsedHashes[key] = value;
    }

    return parsedHashes;
  }

  private getHashString(key: string, value: string): string {
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }

  private removeLeadingAndTrailingCommas(): string {
    if (!this.hash.startsWith(",") && !this.hash.endsWith(",")) {
      return this.hash;
    }

    const start = this.hash.match(/^,+/)?.[0]?.length ?? 0;
    const end = -(this.hash.match(/,+$/)?.[0]?.length ?? -this.hash.length);

    this.hash = this.hash.slice(start, end);

    return this.hash;
  }
}

export default HashManager;
