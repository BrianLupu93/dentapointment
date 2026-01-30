"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/ui/page-layout";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginUser(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className='w-full max-w-md rounded-lg border bg-card p-8 shadow-md mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Login</h1>
        </div>

        {error && (
          <p className='mb-4 text-sm text-red-500 font-medium'>{error}</p>
        )}

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='email'>E-mail</Label>
            <Input
              type='email'
              id='email'
              placeholder='ex: john@ex.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              id='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type='submit' disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </PageLayout>
  );
}
