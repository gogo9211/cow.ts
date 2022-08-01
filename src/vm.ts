import { instructions } from './instructions';

class vm {
    instructions: number[];
    memory: number[];
    memoryPosition: number;
    register: number | undefined;

    constructor(instructions: number[]) {
        this.instructions = instructions;
        this.memory = [0];
        this.memoryPosition = 0;
        this.register = undefined;
    }

    #increment_memory_pos(): void {
        this.memoryPosition++;

        if (this.memory[this.memoryPosition] === undefined)
            this.memory[this.memoryPosition] = 0;
    }

    #decrement_memory_pos(): void {
        this.memoryPosition--;

        if (this.memory[this.memoryPosition] === undefined)
            this.memory[this.memoryPosition] = 0;
    }

    execute(instruction?: number): string {
        let stdout = '';
        let program = this.instructions;
        if (instruction !== undefined)
            program = [instruction];
        for (let i = 0; i < program.length; ++i) {
            switch (program[i]) {
                case instructions.mOo:
                    this.#decrement_memory_pos();
                    break;
                case instructions.moO:
                    this.#increment_memory_pos();
                    break;
                case instructions.oom:
                    let val = window.prompt("enter a value");
                    if (typeof(val) === "string")
                        this.memory[this.memoryPosition] = parseInt(val);
                    break;
                case instructions.MOo:
                    --this.memory[this.memoryPosition];
                    break;
                case instructions.MoO:
                    ++this.memory[this.memoryPosition];
                    break;
                case instructions.OOO:
                    this.memory[this.memoryPosition] = 0;
                    break;
                case instructions.MMM:
                    if (this.register === undefined) {
                        this.register = this.memory[this.memoryPosition];
                    } else {
                        this.memory[this.memoryPosition] = this.register;
                        this.register = undefined;
                    }
                    break;
                case instructions.Moo:
                    if (this.memory[this.memoryPosition] !== 0) {
                        stdout += String.fromCharCode(this.memory[this.memoryPosition]);
                    } else {
                        let val = window.prompt("enter a value");
                        if (typeof(val) === "string")
                            this.memory[this.memoryPosition] = val.charCodeAt(0);
                    }
                    break;
                case instructions.OOM:
                    stdout += this.memory[this.memoryPosition].toString();
                    break;
                case instructions.mOO:
                    if (this.memory[this.memoryPosition] === 3) {
                        throw new Error(`Invalid instruction invoked with \`mOO\`: ${this.memory[this.memoryPosition]}`);
                    } else {
                        let out = this.execute(this.memory[this.memoryPosition]);
                        if (out !== '')
                            stdout += out;
                    }
                    break;
                case instructions.moo: {
                    let level = 1;
                    --i;
                    while (level > 0) {
                        let instruction = program[--i];
                        if (instruction === instructions.moo) {
                            ++level;
                        } else if (instruction === instructions.MOO) {
                            --level;
                        }
                    }
                    --i;
                    break;
                }
                case instructions.MOO: {
                    if (this.memory[this.memoryPosition] !== 0)
                        break;
                    let level = 1;
                    ++i;
                    while (level > 0) {
                        let instruction = program[++i];
                        if (instruction === instructions.MOO) {
                            ++level;
                        } else if (instruction == instructions.moo) {
                            --level;
                        }
                    }
                    break;
                }
                case instructions.unk:
                    throw new Error(`Invalid source code`);
                default:
                    throw new Error(`Unknown instruction: ${this.instructions[i]}`);
            }
        }

        return stdout;
    }
}

export { vm };