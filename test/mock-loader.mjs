export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'next/server') {
    return {
      url: `data:text/javascript,
        export const NextResponse = {
          json: (body, init) => ({
            status: init?.status || 200,
            json: async () => body,
            ...body
          })
        };
        export class NextRequest {
          constructor(input, init) {
            this.body = init?.body ? (typeof init.body === 'string' ? JSON.parse(init.body) : init.body) : {};
          }
          async json() { return this.body; }
        }
      `,
      shortCircuit: true
    };
  }
  return nextResolve(specifier, context);
}
