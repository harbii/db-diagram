export default interface Title {
    Name      : String            ;
    Type      : String            ;
    Extends ? : String [ ] | null ;
    Group   ? : String [ ] | null ;
}