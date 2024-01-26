import {Friend, Colleague, EmailContact} from './myTypes'
import {colleagues, friends} from "./01-basics";

function older(f: Friend) : string {
    f.age += 1
    return `${f.name} is now ${f.age}`
}

function allOlder(fs: Friend[]): string[] {
    return fs.map(f => older(f));
}

console.log(older(friends[0]))
console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]): Colleague {
    const result = cs.sort(
        (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
}
console.log(highestExtension(colleagues.current));

// Add New Colleague
function addColleague(cs: Colleague[], name: string, position: string, email: string): Colleague[] {
    const highest = highestExtension(cs);
    const newExtension = highest ? highest.contact.extension + 1 : 1; // 为新同事分配下一个分机号
    const newColleague: Colleague = {
        name: name,
        department: position,
        contact: {
            email: email,
            extension: newExtension
        }
    };
    cs.push(newColleague);
    return cs;
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max? : number
): EmailContact[] {
    let end = colleagues.length;
    if (max !== undefined) {
        end = max < 2 ? 1 : max
    }
    const sorted = colleagues.sort(sorter);
    const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0,end)
}
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length)));

function findFriends(
    fs: Friend[],
    predicate: (f: Friend) => boolean
): string[] {
    return fs.filter(predicate).map(f => f.name);
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

// Adding a new interest to a friend's interest list
function addInterest(f: Friend, interest: string): string[] {
    // If the interest list does not exist, initialize to an empty array
    if (!f.interests) {
        f.interests = [];
    }

    // If the interest already exists, it is not added repeatedly
    if (!f.interests.includes(interest)) {
        f.interests.push(interest);
    }

    return f.interests;
}
console.log(addInterest(friends[0], 'Politics'))

