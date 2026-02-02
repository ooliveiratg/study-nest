export abstract class MemberRepository {
  abstract create(name: string, memberFunction: string): Promise<void>;
}
