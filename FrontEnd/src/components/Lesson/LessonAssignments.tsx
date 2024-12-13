'use client';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {Loader2, Play} from 'lucide-react'
import Editor from '@monaco-editor/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {submitCode, getSubmission} from "@/services/Judge0"
import ReactMarkdown from "react-markdown";


interface Language {
    id: number;
    value: string;
}

function encodeUnicodeToBase64(str: string) {
    const utf8Bytes = new TextEncoder().encode(str); // Chuyển chuỗi thành Uint8Array (UTF-8 bytes)
    return btoa(String.fromCharCode(...utf8Bytes));  // Encode Uint8Array thành Base64
}

function decodeBase64ToUnicode(base64: string) {
    const binaryString = atob(base64); // Decode Base64 thành chuỗi nhị phân
    const utf8Bytes = new Uint8Array([...binaryString].map(char => char.charCodeAt(0))); // Chuyển chuỗi nhị phân thành Uint8Array
    return new TextDecoder().decode(utf8Bytes); // Chuyển Uint8Array thành chuỗi Unicode
}

const languages: Language[] = [
    {
        id: 91,
        value: "java"
    },
    {
        id: 102,
        value: "javascript"
    },
    {
        id: 71,
        value: "python"
    },
    {
        id: 101,
        value: "typescript"
    },
    {
        id: 105,
        value: "cpp"
    },
    {
        id: 51,
        value: "csharp"
    },
];

export default function LessonAssignments() {
    const [code, setCode] = useState<string>("");
    const [currentLanguage, setCurrentLanguage] = useState<string | undefined>(undefined);
    const [showInput, setShowInput] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [outputLoading, setOutputLoading] = useState<boolean>(false);
    const [exercise, setExercise] = useState<string|null>(`# Bài tập: Biến toàn cục và cục bộ trong JavaScript

## Mô tả

Tạo một hàm \`incrementCounter\` nhận vào một tham số \`step\` và tăng giá trị của biến toàn cục \`counter\` lên giá trị \`step\` sau mỗi lần gọi hàm. Hàm này sẽ trả về giá trị mới của biến \`counter\`.

> **Chú ý:**  
> Biến \`counter\` là **biến toàn cục**. Bạn cần tăng giá trị của biến này mỗi khi gọi hàm mà không thay đổi trực tiếp giá trị ngoài hàm.

## Các ví dụ:

\`\`\`javascript
incrementCounter(5)  ➞ 5
incrementCounter(3)  ➞ 8
incrementCounter(-2) ➞ 6
`);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    }

    const handleShowInput = () => {
        setShowInput(!showInput);
        setInput("");
    }

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

    const handleRunCode = async () => {
        let payload = {
            "source_code": encodeUnicodeToBase64(code),
            "language_id": languages.find((lang) => lang.value === currentLanguage)?.id || 0,
            "stdin": encodeUnicodeToBase64(input),
        }
        console.log(payload);
        try {
            setOutputLoading(true);
            // Gửi submission
            const submitResponse = await submitCode(payload);

            // Polling để kiểm tra trạng thái
            let getResponse;
            while (true) {
                getResponse = await getSubmission(submitResponse.token);

                console.log('Polling Submission Status:', getResponse.status);
                if (getResponse.status.id === 3 || getResponse.status.id === 6 || getResponse.status.id === 11) {
                    // Status 3: Thành công, Status 6: Lỗi runtime
                    break;
                }

                // Chờ 1 giây trước khi thử lại
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            // Xử lý kết quả sau khi hoàn tất
            if (getResponse.stderr || getResponse.compile_output) {
                setOutputLoading(false);
                setError(decodeBase64ToUnicode(getResponse.stderr || getResponse.compile_output));
                setOutput("");
            }
            else {
                setOutputLoading(false);
                setOutput(decodeBase64ToUnicode(getResponse.stdout));
                setError(null);
            }
        } catch (error) {
            console.error('Error in handleRunCode:', error);
        }
    }

    return (
        <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6">
            <div className="lg:col-start-1 flex flex-col order-2 lg:order-none">
                <div className="bg-[#1e1e1e] flex p-4 justify-between">
                    <Select value={currentLanguage}
                            onValueChange={handleLanguageChange} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Ngôn ngữ"/>
                        </SelectTrigger>

                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem value={lang.value}>
                                    {setLanguageName(lang.value)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button className="bg-DarkGreen hover:bg-DarkGreen_Hover w-fit"
                            disabled={!code || !currentLanguage || outputLoading}
                            onClick={handleRunCode}>
                        <div className="flex items-center justify-between gap-2">
                            {outputLoading
                                ?
                                <Loader2 className="h-5 w-5 animate-spin text-white"/>
                                :
                                <Play className="text-white h-4 w-4"/>}

                            <span className="text-white font-semibold">
                                Thực thi
                            </span>
                        </div>
                    </Button>
                </div>

                <div>
                    <Editor height="500px"
                            width={"100%"}
                            language={currentLanguage}
                            value={code}
                            onChange={handleCodeChange}
                            theme="vs-dark"/>
                </div>

                <div className="flex flex-col gap-5 p-2">
                    <div className="flex items-center gap-2 cursor-pointer w-fit" onClick={handleShowInput}>
                        <Checkbox checked={showInput}
                                  className="h-5 w-5"/>
                        <label htmlFor="input"
                               className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {showInput ? "Ẩn đầu vào" : "Hiển thị đầu vào"}
                        </label>
                    </div>

                    {showInput
                        &&
                        <div className="flex flex-col gap-5">
                            <Label className="text-lg font-semibold">
                                Đầu vào:
                            </Label>

                            <Textarea className="h-[100px] resize-none"
                                      value={input}
                                      onChange={handleInputChange}/>
                        </div>
                        }

                    <div>
                        <Label className="text-lg font-semibold">
                            Đầu ra:
                        </Label>
                    </div>

                    <Textarea className={`h-[100px] resize-none ${error ? "text-Red" : "text-black"}`}
                              value={error || output}
                              />

                </div>
            </div>

            <div className="lg:col-start-3 w-fit prose bg-LighterGray rounded-2xl p-4 h-fit order-1 lg:order-none">
                <ReactMarkdown
                    className="text-sm space-y-4"
                    children={exercise}
                    components={{
                        blockquote: ({node, ...props}) => (
                            <blockquote className="border-l-[3px] border-blue-500 pl-4 italic bg-gray-100 p-2" {...props} />
                        ),
                        ul: ({node, ...props}) => (
                            <ul className="list-disc pl-6" {...props} />
                        ),
                        ol: ({node, ...props}) => (
                            <ol className="list-decimal pl-6" {...props} />
                        ),
                        h1: ({ children }) => (
                            <h1 className="text-4xl font-bold my-4">{children}</h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-3xl font-semibold my-3">{children}</h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-2xl font-medium my-2">{children}</h3>
                        ),
                        h4: ({ children }) => (
                            <h4 className="text-xl font-light text-red-400 my-1">{children}</h4>
                        ),
                    }}
                />
            </div>
        </div>
    );
}