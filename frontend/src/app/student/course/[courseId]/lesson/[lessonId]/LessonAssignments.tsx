'use client';
import React, {useEffect} from 'react';
import Editor from '@monaco-editor/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const languages = [
    "cpp",
    "csharp",
    "java",
    "javascript",
    "python",
    "typescript",
];

export default function LessonAssignments() {
    const [code, setCode] = React.useState<string>("");
    const [currentLanguage, setCurrentLanguage] = React.useState<string | undefined>(undefined);

    const setLanguageName = (lang: string) => {
        switch (lang) {
            case "cpp":
                return "C++";
            case "csharp":
                return "C#";
            case "java":
                return "Java";
            case "javascript":
                return "JavaScript";
            case "python":
                return "Python";
            case "typescript":
                return "TypeScript";
            default:
                return "Ngôn ngữ";
        }
    }

    const handleLanguageChange = (value: string | undefined) => {
        if (value) {
            setCurrentLanguage(value);
            setCode("");
        }
    }

    const handleCodeChange = (value: string | undefined) => {
        if (value) {
            setCode(value);
        }
    }

    useEffect(() => {
        console.log(code);
    }, [code]);

    return (
        <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6">
            <div className="lg:col-start-1 flex flex-col">
                <div className="bg-[#1e1e1e] flex p-4">
                    <Select value={currentLanguage}
                            onValueChange={handleLanguageChange} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Ngôn ngữ"/>
                        </SelectTrigger>

                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem value={lang}>
                                    {setLanguageName(lang)}
                                </SelectItem>
                            ))}
                        </SelectContent>

                    </Select>
                </div>

                <div>
                    <Editor height="500px"
                            width={"100%"}
                            language={currentLanguage}
                            value={code}
                            onChange={handleCodeChange}
                            theme="vs-dark"/>
                </div>
            </div>
        </div>
    );
}