import { instructions } from './instructions';

function compile(source: string): number[] {
    let sourceArray = source.split(' ');

    if (sourceArray.length === 1)
    {
        sourceArray = [];

        for (let i = 0; i < source.length; i += 3)
            sourceArray.push(source.substring(i, i + 3));
    }
    
    let instructionsArray = sourceArray.map<number>(val => {
        for (let inst in instructions)
            if (inst === val)
                return instructions[inst as keyof typeof instructions];

        return instructions.unk;
    })

    return instructionsArray;
}

export { compile };